const inquirer = require('inquirer');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const puppeteer = require('puppeteer')

module.exports = {
  ChangeName: () => {
clear()
console.log(
    chalk.green(
    figlet.textSync('BOLT UTIL', { horizontalLayout: 'full' })
    )
);
console.log('\n\nBOLT Modem utility name changer')
      inquirer.prompt([
        {
            name: 'link',
            type: 'input',
            message: 'Link bolt webUI:',
            default: '192.168.1.1',
            validate: function(value) {
                if(value.length){
                    return true
                }else{
                    return 'Mohon masukan link webUI'
                }
            }
        },
        {
            name: 'nama',
            type: 'input',
            message: 'Nama SSID:',
            validate: function(value) {
                if(value.length){
                    return true
                }else{
                    return 'Mohon masukan nama SSID'
                }
            }
        },
        {
            name: 'nama',
            type: 'input',
            message: 'Nama SSID:',
            validate: function(value) {
                if(value.length > 32){
                    return 'Nama SSID terlalu panjang'
                }else if(value.match('/[$/:-?{-~!"^`\[\]]/')){
                    return 'Nama SSID hanya diperbolehkan : abjad,angka,"-",dan "_"'
                }else if(value.length){
                    return true
                }else{
                    return 'Mohon masukan nama SSID'
                }
            }
        },
        {
            name: 'password',
            type: 'input',
            message: 'Password SSID:',
            validate: function(value) {
                if(value.length > 32){
                    return 'Password SSID terlalu panjang'
                }else if(value.match('/[$-/:-?{-~!"^_`\[\]]/')){
                    return 'Password SSID hanya diperbolehkan abjad dan angka'
                }else if(value.length){
                    return true
                }else{
                    return 'Mohon masukan password SSID'
                }
            }
        }
      ]).then(async (hasil) => {
          clear()
          console.log(
            chalk.green(
            figlet.textSync('PROCESSING', { horizontalLayout: 'full' })
            )
        );
        console.log('\nSedang proses ...')
        await nameChanger(hasil.link, hasil.nama, hasil.password)
      })
  }
}

const nameChanger = async (link, nama, password) => {
    try {
        let launchOptions = { headless: true, args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage","--disable-accelerated-2d-canvas","--disable-gpu","--window-size=1920x1080",] };
        const browser = await puppeteer.launch(launchOptions);
        const page = await browser.newPage();
        await page.setViewport({width: 1366, height: 768});
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        await page.goto('http://'+link);
        await page.waitForSelector('#tbarouter_password', {
            disabled: false
        });
        await page.$eval('#tbarouter_password', el => el.value = 'admin')
        await page.click('#btnSignIn')
        await page.click('#tab_settings')
        await page.waitForSelector('#td_ssid_input > input')
        const name = await page.$('#td_ssid_input > input');
        await name.click({ clickCount: 3 })
        await name.type(nama);
        const pwd = await page.$('#wifi_password')
        await pwd.click({clickCount: 3})
        await pwd.type(password);
        await page.waitForSelector('#repeated_wifi_password')
        const pwdConfirm = await page.$('#repeated_wifi_password')
        await pwdConfirm.click({clickCount: 3})
        await pwdConfirm.type(password);
        clear()
        console.log(
            chalk.green(
            figlet.textSync('KONFIRMASI', { horizontalLayout: 'full' })
            )
        );
        await inquirer.prompt([
            {
                name: 'konfirmasi',
                type: 'confirm',
                message: `\nApakah\nNama SSID: ${nama}\nPassword SSID: ${password}\n\nSudah benar?`,
                default: false
            }
        ]).then(async (hasilnya) => {
            if(hasilnya.konfirmasi){
                await page.click('#btn_quick_setup_apply')
                clear()
                console.log(
                    chalk.green(
                    figlet.textSync('SUKSES', { horizontalLayout: 'full' })
                    )
                );
                await browser.close()
                require('child_process').spawnSync("pause", {shell: true, stdio: [0, 1, 2]});
            }else{
                await browser.close()
                require('child_process').spawnSync("pause", {shell: true, stdio: [0, 1, 2]});
            }
        })
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