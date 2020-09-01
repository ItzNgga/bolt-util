const inquirer = require('inquirer')
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const nama = require('./lib/name.js')
const unlock = require('./lib/unlock.js')
clear()
console.log(
    chalk.green(
      figlet.textSync('BOLT UTIL', { horizontalLayout: 'full' })
    )
  );
console.log('\n\nBOLT Modem utility')
inquirer.prompt([
    {
        type: "list",
        message: "Pilih utilitas\n",
        name: "tipe",
        choices: ["ChangeName","Unlock","IMEI"]
    }
]).then(async (answer) => {
    switch (answer.tipe) {
        case 'ChangeName':
            nama.ChangeName();
            break;
        case 'Unlock':
            unlock.unlock();
            break;
        case 'IMEI':
            clear()
            console.log(
                chalk.green(
                  figlet.textSync('RANDOM IMEI', { horizontalLayout: 'full' })
                )
            );
            var imei = require('node-imei');
            var IMEI= new imei();
            console.log(`\nYour IMEI: ${IMEI.device('Samsung','GalaxyS3')}`)
            break
    }
})
