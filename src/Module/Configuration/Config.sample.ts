import { ConfI } from "./ConfigI";


export const conf: ConfI = {
    env: 'dev', // Тип окружения
    mysql: { // Knex mysql
        "client": "mysql",
        "connection": {
            "host": "127.0.0.1", // Хос базы
            "user": "root", // логин
            "password": "vovacolt170999", // пароль
            "database": "art_box_db" // имя базы
        },
        "pool": { "min": 0, "max": 7 },
        //"migrations": {
        //    "tableName": "knex_migrations",
        //    "directory": "./lib/Infrastructure/SQL/Migrations"
        //},
        //"acquireConnectionTimeout": 60000
    },
    common: {
        port: 3007,
    },


    redis: { // Конфигруация редиса
        "url": "redis://127.0.0.1:6379"
    },

};
