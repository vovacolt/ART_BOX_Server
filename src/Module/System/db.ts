import { conf } from "../Configuration/Config.sample";

//export const db = require('knex')(conf.mysql); // knex connect

export const db = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'vovacolt170999',
      database : 'art_box_db',
      port: 3007
    }
  });
// clients
export interface SocketClientI {
    [key: string]: any;
}

/* clients */
export const aSocketClient: SocketClientI = {};