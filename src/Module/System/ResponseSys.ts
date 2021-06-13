import * as net from "net";

/**
 * Basic client response
 */
export interface BaseResponseI 
{
    sRoute: string;
    ok: boolean;
    data: any;
    errors: any;
}

/**
 * basic request from client
 */
export interface BaseRequestI 
{
    sClientToken: string;
    sRoute: string;
    data: any;
    ok?: boolean;
    error?: any;
}

/**
 * Parsing request from client   server <== client
 * @param data 
 * @param sClientToken 
 */
export const Request = (data: Buffer, sClientToken: string): BaseRequestI => 
{
    let out: BaseRequestI = 
    {
        sRoute: '',
        data: null,
        ok: true,
        error: null,
        sClientToken: sClientToken,
    }

    try 
    {
        const req: BaseRequestI = JSON.parse(data.toString());

        if (req.sRoute) 
        {
            out.sRoute = req.sRoute;
        }

        if (req.data) 
        {
            out.data = req.data;
        }

        if (req.ok) 
        {
            out.ok = true;
        }

    } catch (e) 
    {
        out.ok = false;
        out.error = e;
    }

    return out;
}

/**
 * response from server ==> client
 * @param socket 
 * @param response 
 */
export const Response = (socket: net.Socket, response: BaseResponseI) => 
{
    socket.write(JSON.stringify(response))
}