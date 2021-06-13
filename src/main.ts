import * as net from "net";
const moment = require('moment');

import { GeneratedToken } from "./Lib/HashFunc";
import { SocketClient, db } from "./Module/System/db";
import { GetArtDiscription, GetCountArt } from "./Module/Clients/Client_Controller";
import { BaseRequestI, Request, Response } from "./Module/System/ResponseSys";
import { UserAPI } from "./Module/Clients/Client_Response";

/**
 * The current date
 */
const GetNowDataStr = (): string => moment().format('DD.MM.YYYY HH:mm:ss');

/**
 * Server handler
 */
const server = net.createServer((socket: net.Socket) => {

    /* we generate a token to the client */
    const clientToken = GeneratedToken();
    SocketClient[clientToken] = true;

    console.log(`[${GetNowDataStr()}] Client connect ${clientToken}`);


    /* receiving data from a client */
    socket.on('data', async (data: Buffer) => {

        console.log(`[${GetNowDataStr()}] Data from [${clientToken}]: `, data.toString());

        // router

        const request: BaseRequestI = Request(data, clientToken);

        /* connect login controller */
        if (request.sRoute == UserAPI.sRequestRoute) 
        {
            await GetArtDiscription(request, socket, db);
        }
        else if (request.sRoute == UserAPI.sRequestCount)
        {
            await GetCountArt(request, socket, db);
        } 
        else 
        {
            /* if the route did not match, sends empty line */
            Response(socket, {
                sRoute: '',
                ok:true,
                data: {},
                errors: [],
            });
        }

    });

    /* client disconnect */
    socket.on('end', () => {
        delete SocketClient[clientToken];
        console.log(`[${GetNowDataStr()}] Client ${clientToken} disconnect`);
    });

    /* socket error */
    socket.on('error', (err) => {
        console.log(`[${GetNowDataStr()}] Error:`, err);
    });

});

/* server error */
server.on('error', (err: any) => {
    console.log(`[${GetNowDataStr()}] Error:`, err);
});


/* start the server */
server.listen({
    port: 3008, family: 'IPv4', address: '127.0.0.1'
}, () => {
    console.log('opened server on', server.address());
});