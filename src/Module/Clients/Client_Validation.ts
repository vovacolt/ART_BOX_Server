import { FieldValidator } from '@a-a-game-studio/aa-components/lib';
import { UserLogin } from './Client_Response';


/**
 * Input data validator
 * @param data 
 * @param cValidator 
 */
export const faUserLoginV = (data: UserLogin.RequestI, cValidator: FieldValidator): FieldValidator => {

    cValidator.fSetData(data.id)
        .fSetErrorString('id')
        .fExist()
        .fMinLen(1)
        .fMaxLen(10);

    if (!cValidator.fIsOk()) {
        throw 'error';
    }

    return cValidator;

}