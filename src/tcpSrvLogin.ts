import * as net from "net";
const moment = require('moment');

import { fGenerateToken } from "./Lib/HashFunc";
import { aSocketClient, db } from "./Module/System/db";
import * as AAClasses from '@a-a-game-studio/aa-classes/lib';
import { faUserLogin, faCountArt } from "./Module/Clients/Client_Controller";
import { fBaseRequest, fRequest, fResponse } from "./Module/System/ResponseSys";
import { UserLogin } from "./Module/Clients/Client_Response";

/**
 * The current date
 */
const fGetNowDataStr = (): string => moment().format('DD.MM.YYYY HH:mm:ss');

/**
 * Server handler
 */
const server = net.createServer((socket: net.Socket) => {

    /* we generate a token to the client */
    const clientToken = fGenerateToken();
    aSocketClient[clientToken] = true;

    console.log(`[${fGetNowDataStr()}] Client connect ${clientToken}`);


    /* receiving data from a client */
    socket.on('data', async (data: Buffer) => {
        const errorSys = new AAClasses.Components.ErrorSys();

        console.log(`[${fGetNowDataStr()}] Data from [${clientToken}]: `, data.toString());

        // router

        const request: fBaseRequest = fRequest(data, clientToken);

        /* connect login controller */
        if (request.sRoute == UserLogin.sRequestRoute) 
        {
            await faUserLogin(socket, request, errorSys, db);
        }
        else if (request.sRoute == UserLogin.sRequestCount)
        {
            await faCountArt(socket, request, errorSys, db);
        } 
        else 
        {
            /* if the route did not match, sends empty line */
            fResponse(socket, {
                sRoute: '',
                ok:true,
                data: {},
                errors: [],
            });
        }

    });

    /* client disconnect */
    socket.on('end', () => {
        delete aSocketClient[clientToken];
        console.log(`[${fGetNowDataStr()}] Client ${clientToken} disconnect`);
    });

    /* socket error */
    socket.on('error', (err) => {
        console.log(`[${fGetNowDataStr()}] Error:`, err);
    });

});

/* server error */
server.on('error', (err: any) => {
    console.log(`[${fGetNowDataStr()}] Error:`, err);
});


/* start the server */
server.listen({
    port: 3008, family: 'IPv4', address: '127.0.0.1'
}, () => {
    console.log('opened server on', server.address());
});