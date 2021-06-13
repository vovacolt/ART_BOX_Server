import { BaseResponseI } from "../System/ResponseSys";
import { ArtI, CountI } from "./Client_Art_Discription";

/**
 * User Login
 */
export namespace UserAPI 
{

   export const sRequestRoute = 'id_req';
 
   export const sResponseRoute = 'id_resp';

   export const sRequestCount = 'count_req';

   export const sResponseCount = 'count_resp';
   

    export interface RequestI 
    {
       id: number;
       widget_id: string;
    }


    export interface ResponseI extends BaseResponseI 
    {
       data: 
       {
          art: ArtI;
       }
    }

    export interface ResponseCountI extends BaseResponseI 
    {
       data: 
       {
          count: CountI;
       }
    }
 }
 