import { UserSQL } from './Client_SQL';
import { ArtI, CountI } from './Client_Art_Discription';
import { SocketClient } from '../System/db';
import { UserAPI } from './Client_Response';
import * as net from "net";
import { BaseRequestI, Response } from '../System/ResponseSys';

/**
 * User controller
 */
export const GetArtDiscription = async (request: BaseRequestI, socket: net.Socket, db: any) => 
{

   const userSQL = new UserSQL(db);
   let art: ArtI;
   let err: any;

   try 
   {

      const data: UserAPI.RequestI = request.data;

      /* we get a response from DB */
      art = await userSQL.faGetUserInfoByToken(data.id, data.widget_id);

   } 
   
   catch (e) 
   {
      err = e;
      console.log(e);
   }

   /* we form the answer */
   const resp: UserAPI.ResponseI = 
   {
      sRoute: UserAPI.sResponseRoute,
      ok: true,

      data: 
      {
         art: art,
      },

      errors: err,
   }

   /* send a message to the client */
   Response(socket, resp);

   /* if everything is well written user information in the shared memory */
   SocketClient[request.sClientToken] = 
   {
      art: art,
   }

   console.log('faUserLogin msg', request.data);

}

export const GetCountArt = async (request: BaseRequestI, socket: net.Socket, db: any) => 
{

   const userSQL = new UserSQL(db);
   let count: CountI;
   let err: any;

   try 
   {
      /* we get a response from DB */
      count = await userSQL.faGetArtCount();
   } 
   
   catch (e) 
   {
      err = e;
      console.log(e);
   }

   /* we form the answer */
   const resp: UserAPI.ResponseCountI = 
   {
      sRoute: UserAPI.sResponseCount,
      ok: true,

      data: 
      {
         count: count,
      },

      errors: err,
   }

   /* send a message to the client */
   Response(socket, resp);

   /* if everything is well written user information in the shared memory */

   SocketClient[request.sClientToken] = 
   {
      count: count,
   }
}