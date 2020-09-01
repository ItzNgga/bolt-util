var imei = require('node-imei')
const IMEI = new imei

module.exports = {
    gen: () => {
        const random = Math.floor(Math.random() * 8); 
        switch (random) {
            case 0:
                return `${IMEI.device('Samsung','GalaxyS3')}`
            case 1:
                return `${IMEI.device('Samsung','SMT5613474')}`
            case 2:
                return `${IMEI.device('HTC','WildFire')}`
            case 3:
                return `${IMEI.device('Nokia','N9')}`
            case 4:
                return `${IMEI.device('Nokia','N9_2')}`
            case 5:
                return `${IMEI.device('Nokia','N9_3')}`
            case 6:
                return `${IMEI.device('Nokia','N1320')}`
            case 7:
                return `${IMEI.device('Nokia','N1320_2')}`
        }
    }
}