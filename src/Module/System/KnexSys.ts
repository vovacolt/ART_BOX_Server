/**
 * Knex Query Writing Wrapper
 */

export class KnexSys 
{

    /**
     * Get string from SQL raw query
     * @param data
     */
    GetOneRaw(data: any): any 
    {
        let one = null;

        try 
        {
            one = data[0][0];
        } 
        
        catch (e) 
        {
            console.log(e);
        }

        return one;
    }

    /**
     * Get list from SQL raw query
     * @param data
     */
    async GetListRaw(data: any): Promise<any> 
    {
        let list = null;

        try 
        {
            list = data[0];
        } 
        
        catch (e) 
        {
            console.log(e);
        }

        return list;
    }

    /**
     * Get field from SQL raw query
     * @param data
     * @param sField
     */
    GetFieldRaw(sField: string, data: any): number | string | boolean | bigint 
    {
        let field = null;

        try 
        { 
            field = data[0][0][sField];
        } 
        
        catch (e) 
        {
            console.log(e);
        }

        return field;
    }

    // ==========================================

    /**
     * Get row from SQL builder query
     * @param data
     */
    async GetOne(data: any): Promise<any> 
    {
        let one = null;

        try 
        { 
            one = data[0];
        }
         
        catch (e) 
        {
            console.log(e);
        }

        return one;
    }

    /**
     * List
     * @param data
     */
    async GetList(data: any): Promise<any> 
    {
        let list = null;
        try 
        { 
            list = data;
        } 
        
        catch (e) 
        {
            console.log(e);
        }

        return list;
    }

    /**
     * Get field from SQL builder query
     * @param sField
     * @param data
     */
    async GetField(sField: string, data: any): Promise<number | string | boolean | bigint> 
    {
        let field = null;

        try 
        { 
            field = data[0][sField];
        } 
        
        catch (e) 
        {
            console.log(e);
        }

        return field;
    }
}
