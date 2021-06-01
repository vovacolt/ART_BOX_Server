import { Components  } from '@a-a-game-studio/aa-classes/lib';
import { FieldValidator } from '@a-a-game-studio/aa-components/lib';
import { UserSQL } from './Client_SQL';
import { ArtI, CountI } from './Client_Art_Discription';
import { aSocketClient } from '../System/db';
import { UserLogin } from './Client_Response';
import * as net from "net";
import { fBaseRequest, fResponse } from '../System/ResponseSys';

/**
 * User controller
 */
export const faUserLogin = async (socket: net.Socket, request: fBaseRequest, errorSys: Components.ErrorSys, db: any) => 
{

   const userSQL = new UserSQL(errorSys, db);
   let cValidator = new FieldValidator(errorSys, {});
   let art: ArtI;

   try 
   {

      const data: UserLogin.RequestI = request.data;

      if (!cValidator.fIsOk()) 
      {
         throw 'error';
      }

      /* we get a response from DB */
      art = await userSQL.faGetUserInfoByToken(data.id, data.widget_id);

   } 
   
   catch (e) 
   {
      /* everything is bad with the base */
      cValidator.fSetErrorString('all bad')
         .fSetData(null)
         .fExist(e);
   }

   /* we form the answer */
   const resp: UserLogin.ResponseI = 
   {
      sRoute: UserLogin.sResponseRoute,
      ok: cValidator.fIsOk(),

      data: 
      {
         art: art,
      },

      errors: cValidator.fGetErrorSys().getErrors()
   }

   /* send a message to the client */
   fResponse(socket, resp);

   /* if everything is well written user information in the shared memory */
   if (cValidator.fIsOk()) 
   {
      aSocketClient[request.sClientToken] = 
      {
         art: art,
      }
   }

   console.log('faUserLogin msg', request.data);

}

export const faCountArt = async (socket: net.Socket, request: fBaseRequest, errorSys: Components.ErrorSys, db: any) => 
{

   const userSQL = new UserSQL(errorSys, db);
   let cValidator = new FieldValidator(errorSys, {});
   let count: CountI;

   try 
   {

      //const data: UserLogin.RequestCountI = request.data;

      //if (!cValidator.fIsOk()) 
      //{
         //throw 'error';
      //}

      /* we get a response from DB */
      count = await userSQL.faGetArtCount();

   } 
   
   catch (e) 
   {
      /* everything is bad with the base */
      cValidator.fSetErrorString('all bad')
         .fSetData(null)
         .fExist(e);
   }

   /* we form the answer */
   const resp: UserLogin.ResponseCountI = 
   {
      sRoute: UserLogin.sResponseCount,
      ok: cValidator.fIsOk(),

      data: 
      {
         count: count,
      },

      errors: cValidator.fGetErrorSys().getErrors()
   }

   /* send a message to the client */
   fResponse(socket, resp);

   /* if everything is well written user information in the shared memory */
   if (cValidator.fIsOk()) 
   {
      aSocketClient[request.sClientToken] = 
      {
         count: count,
      }
   }

   //console.log('faUserLogin msg', request.data);

}