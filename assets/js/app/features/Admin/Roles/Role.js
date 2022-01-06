import axios from 'axios';
import { ROLES } from '../../../../routes';
import { toastr } from 'react-redux-toastr';

export async function getAllRoles() {

    const resp = axios.get(ROLES).then(response => response.data['hydra:member'].map(function (object) {
        return ({
            'key': object.id,
            'text': object.code,
            'value': object.code
        })
    }));

    return await resp;
}