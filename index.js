const inquirer = require('inquirer')
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const nama = require('./lib/name.js')
const unlock = require('./lib/unlock.js')
const imei = require('./lib/imei.js')

// ____     ___    _       _____     _   _   _____   ___   _
// | __ )   / _ \  | |     |_   _|   | | | | |_   _| |_ _| | |
// |  _ \  | | | | | |       | |     | | | |   | |    | |  | |
// | |_) | | |_| | | |___    | |     | |_| |   | |    | |  | |___
// |____/   \___/  |_____|   |_|      \___/    |_|   |___| |_____|

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
            console.log('\nYour IMEI: '+imei.gen())
            require('child_process').spawnSync("pause", {shell: true, stdio: [0, 1, 2]});
            break
    }
})
