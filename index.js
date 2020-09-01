const inquirer = require('inquirer')
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const nama = require('./lib/name.js')

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
        message: "Pilih aksi",
        name: "tipe",
        choices: ["ChangeName","Unlock"]
    }
]).then(async (answer) => {
    switch (answer.tipe) {
        case 'ChangeName':
            nama.ChangeName();
            break;
    
        default:
            console.log('Mohon masukan tipe utilitas')
            process.exit(22);
    }
})
