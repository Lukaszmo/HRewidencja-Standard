
import { toastr } from 'react-redux-toastr';
import history from '../../history';

// const tokenLifeTime = 360000;
const tokenKey = 'token';
const expirationDateKey = 'token-expiration-date';

export function getToken() {
    return localStorage.getItem(tokenKey);
}

export function isAuthenticated() {
    // return getToken() !== null && getExpirationDate() > (new Date()).getTime();
    return getToken() !== null;
    //póki co zawsze autentykacja jest poprawna
    //return 1;
}


export const checkMenuAccess = (item) => {

    const accessMode = getAccessMode(item);

    return accessMode;
}

export const checkItemAccess = (item) => {

    const promise = new Promise((resolve, reject) => {

        const accessMode = getAccessMode(item);

        if (accessMode === false) {
            toastr.error('Brak uprawnień');
            setTimeout(function () { history.goBack() }, 2000);
            reject();
        }
        resolve();
    })
    return promise;
}

export const getAccessMode = (item) => {

    let accessMode = false;

    let accessList = new Map(JSON.parse(localStorage.getItem('items')));

    accessList.forEach(function (el, index) {
        if (el.item === item) {
            accessMode = el.access;
        }
    })

    return accessMode;
};







