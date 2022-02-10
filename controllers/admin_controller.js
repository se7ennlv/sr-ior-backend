
exports.testConnection = async (req, res, next) => {
    const { Sequelize } = require('sequelize');
    const sequelize = new Sequelize('sr_io_record', 'h8ozir7c3ccd', 'Dev@SR999!!!', {
        host: '148.72.219.239',
        port: '3306',
        dialect: 'mysql'
    });
    // const sequelize = new Sequelize('sr_io_record', 'root', 'MRAmra@88945', {
    //     host: '115.84.80.98',
    //     port: '3310',
    //     dialect: 'mariadb'
    // });
    try {
        await sequelize.authenticate();
        //console.log('Connection has been established successfully.');
        res.status(200).json({
            status: "success",
            message: 'Connection has been established successfully.'
        });
    } catch (error) {
        //console.error('Unable to connect to the database:', error);
        res.status(200).json({
            status: "error",
            message: `Unable to connect to the database: ${error}`
        });
    }
};

