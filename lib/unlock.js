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
console.log('\n\nBOLT Modem unlocker')
      inquirer.prompt([
        {
            name: 'versi',
            type: 'list',
            message: 'Versi Modem BOLT',
            choices: ['v16','v17','v18','v22']
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
                process.exit(22)
            case 'v17':
            break
            case 'v18':
            break
            case 'v22':
            break
        }
          clear()
          console.log(
            chalk.green(
            figlet.textSync('PROCESSING', { horizontalLayout: 'full' })
            )
        );
        console.log('\nSedang proses ...')
      })
  }
}