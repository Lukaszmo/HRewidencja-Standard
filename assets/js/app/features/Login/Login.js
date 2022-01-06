import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import history from '../../../history';
import { GENERATE } from '../../../routes';

//action types
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

//actions
function loginSuccess(userId) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            userId: userId
        }
    }
}

function loginFail() {
    return {
        type: LOGIN_FAIL,
    }
}

function logoutOperation() {
    return {
        type: LOGOUT,
    }
}

//operations
export function userLoginOperation(user) {
    return function (dispatch) {
        //UserService.setUserCredentials

        const userToAuthenticate = {
            username: user.login,
            password: user.password
        }

        axios.post(GENERATE, userToAuthenticate)
            .then(function (response) {
                dispatch(loginSuccess(response.data.userId));
                toastr.info("Witaj w wersji demo aplikacji");
                localStorage.setItem("token", response.data.token);
                history.push('/home');
            })
            .catch(function (error) {
                dispatch(loginFail());
            });
    }
}

export function userLogoutOperation() {

    return function (dispatch) {

        dispatch(logoutOperation());
        history.push('/login');
    }

}


const initialState = {
    loginFailureCounter: 0
}

//reducers
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_FAIL: {
            return {
                ...state,
                loginFailureCounter: ++state.loginFailureCounter
            };
        }
        case LOGIN_SUCCESS: {
            //return { ...state, loginFailureCounter: 0, "userId": action.payload.userId };
            return {
                ...state, ...action.payload,
                loginFailureCounter: 0
            };
        }
        case LOGOUT: {
            return {
                ...state
            };
        }

        //jeśli nie było żadnej akcji zwraca stan bez zmiany
        default: return state;
    }
}