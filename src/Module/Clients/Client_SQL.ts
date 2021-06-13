import BaseSQL from "../System/BaseSQL";
import { ArtE, ArtI, CountI } from "./Client_Art_Discription";

export class UserSQL extends BaseSQL 
{

    public async faGetUserInfoByToken(id: number, widget_id: string): Promise<ArtI> 
    {
        let res: ArtI;

        let sql = 
        `
            SELECT (SELECT COUNT(id) FROM ${ArtE.NAME}) AS count, u.id, :w_id as widget_id, u.name, u.author, u.age, u.description, u.url FROM ${ArtE.NAME} u
            WHERE            
                u.id = :id
            LIMIT 1
        `;

        try 
        {
            let result = await this.db.raw(sql, 
            {
                'id': id,
                'w_id': widget_id,
            }
            );
            res = result[0][0];
            
        } 
        
        catch (e) 
        {
            console.log(e);
        }

        return res;
    }


    public async faGetArtCount(): Promise<CountI> 
    {
        let res: CountI;

        let sql = 
        `
            SELECT COUNT(id) AS count FROM ${ArtE.NAME}
            LIMIT 1 
        `;

        try 
        {
            let result = await this.db.raw(sql, {});

            res = result[0][0];
            
        } 
        
        catch (e) 
        {
            console.log(e);
        }

        return res;
    }
}