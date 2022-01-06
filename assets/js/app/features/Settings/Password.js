import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';
import { USER } from '../../../routes';

export const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Pole wymagane'),
    newpassword: Yup.string()
        .required('Pole wymagane')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}$/, 'Hasło powinno zawierać co najmniej 7 znaków, w tym jedną cyfrę, jedną małą i jedną dużą literę'),
    newpassrepeat: Yup.string()
        .required('Pole wymagane')
        .oneOf([Yup.ref('newpassword'), null], 'Hasło niezgodne')
});

export const changePassword = (credentials, userid) => {

    return axios.put(USER + '/' + userid + '/password/change', credentials)
        .then((response) => {
            toastr.success('Hasło zostało zmienione');
        })
        .catch(function (error) {
            console.log(error.response);
            toastr.error(error.response.data['error']);
        });

}