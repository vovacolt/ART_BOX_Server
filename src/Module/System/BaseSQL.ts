// System services
import { KnexSys } from './KnexSys';


/**
 * SQL
 */
export default class BaseSQL 
{

    protected db: any;
    protected knexSys: KnexSys;

    constructor(db: any) 
    {

        this.knexSys = new KnexSys();
        this.db = db; // knex connect
    }

}
