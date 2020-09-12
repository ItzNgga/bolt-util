const inquirer = require('inquirer');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const puppeteer = require('puppeteer')

module.exports = {
  unlock: () => {
    clear()
    console.log(
        chalk.green(
        figlet.textSync('BOLT UTIL', { horizontalLayout: 'full' })
        )
    );
console.log('\nBOLT Modem unlocker')
      inquirer.prompt([
        {
            name: 'versi',
            type: 'list',
            message: 'Versi Modem BOLT',
            choices: ['v16','v17','v19','v22']
        }
      ]).then(async (hasil) => {
        switch (hasil.versi) {
            case 'v16':
                clear()
                console.log(
                    chalk.red(
                    figlet.textSync('ERROR', { horizontalLayout: 'full' })
                    )
                );
                console.log('\nVersi 16 tidak perlu unlock lagi, langsung ganti IMEI')
                require('child_process').spawnSync("pause", {shell: true, stdio: [0, 1, 2]});
                break
            case 'v17':
                unlock1()
            break
            case 'v19':
                unlock1()
            break
            case 'v22':
                unlock2()
            break
        }
      })
  }
}

const unlock1 = async () => {
    try {
        clear()
          console.log(
            chalk.green(
            figlet.textSync('PROCESSING', { horizontalLayout: 'full' })
            )
        );
        console.log('\nSedang proses ...')
        let launchOptions = { headless: false, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage","--disable-accelerated-2d-canvas","--disable-gpu","--window-size=1920x1080",] };
        const browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(50000); 
        await page.setViewport({width: 1366, height: 768});
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        await page.goto('http://192.168.1.1');
        await page.waitForSelector('#tbarouter_password', {
            disabled: false
        });
        await page.$eval('#tbarouter_password', el => el.value = 'admin')
        await page.waitForSelector('#btnSignIn', {
            disabled: false
        });
        await page.click('#btnSignIn')
        await page.click('#tab_settings')
        await page.click('#mSoftUpdate')
        await page.waitForSelector('#softVersionUpdateFile');
        const upgradeFile = await page.$('#softVersionUpdateFile')
        await upgradeFile.uploadFile('./lib/v16.bin')
        await page.click('#btUpgrade')
        clear()
        console.log(
            chalk.green(
            figlet.textSync('SUCCES', { horizontalLayout: 'full' })
            )
        );
        console.log('\nUnlock sukses!, Mohon tunggu hingga modem restart')
        require('child_process').spawnSync("pause", {shell: true, stdio: [0, 1, 2]});
    } catch (error) {
        clear()
        console.log(
            chalk.red(
            figlet.textSync('ERROR', { horizontalLayout: 'full' })
            )
        );
        console.log(error)
        console.log('\nProses ERROR!\nMungkin terjadi masalah: \n1.Port modem error\n2.Driver modem belum terinstall\n3.Link tidak valid')
        require('child_process').spawnSync("pause", {shell: true, stdio: [0, 1, 2]});
    }
}
const unlock2  = async () => {
    try {
        clear()
          console.log(
            chalk.green(
            figlet.textSync('PROCESSING', { horizontalLayout: 'full' })
            )
        );
        console.log('\nSedang proses ...')
        let launchOptions = { headless: true, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage","--disable-accelerated-2d-canvas","--disable-gpu","--window-size=1920x1080",] };
        const browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(50000); 
        await page.setViewport({width: 1366, height: 768});
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        await page.goto('http://192.168.1.1');
        await page.waitForSelector('#tbarouter_password', {
            disabled: false
        });
        await page.$eval('#tbarouter_password', el => el.value = 'admin')
        await page.click('#btnSignIn')
        await page.click('#tab_settings')
        await page.evaluate(() => {
            $("#selectSecurityModeType option:contains('WPA2(AES)-PSK')")[0].selected = true
        })
        const angka = Math.floor(Math.random() * 899999999999 + 100000000000)
        const pwd = await page.$('#wifi_password')
        await pwd.click({clickCount: 3})
        await pwd.type(`${angka}`);
        await page.waitForSelector('#repeated_wifi_password')
        const pwdConfirm = await page.$('#repeated_wifi_password')
        await pwdConfirm.click({clickCount: 3})
        await pwdConfirm.type(`${angka}`);
        await page.click('#btn_quick_setup_apply')
        clear()
        console.log(
            chalk.green(
            figlet.textSync('SUCCES', { horizontalLayout: 'full' })
            )
        );
        await browser.close()
        console.log('\nUnlock sukses!')
        require('child_process').spawnSync("pause", {shell: true, stdio: [0, 1, 2]});
    } catch (error) {
        clear()
        console.log(
            chalk.red(
            figlet.textSync('ERROR', { horizontalLayout: 'full' })
            )
        );
        console.log('\nProses ERROR!\nMungkin terjadi masalah: \n1.Port modem error\n2.Driver modem belum terinstall\n3.Link tidak valid')
        require('child_process').spawnSync("pause", {shell: true, stdio: [0, 1, 2]});
    }
}