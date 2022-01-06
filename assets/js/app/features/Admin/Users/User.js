import axios from 'axios';
import { USERS } from '../../../../routes';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';

export const UserValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Pole wymagane')
        .max(15, 'Maksymalna ilość znaków: 15'),
    password: Yup.string()
        .required('Pole wymagane')
        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{7,}$/, 'Hasło powinno zawierać co najmniej 7 znaków, w tym jedną cyfrę, jedną małą i jedną dużą literę'),
    firstname: Yup.string()
        .required('Pole wymagane')
        .max(30, 'Maksymalna ilość znaków: 30'),
    lastname: Yup.string()
        .required('Pole wymagane')
        .max(40, 'Maksymalna ilość znaków: 40'),
    regnum: Yup.string()
        .required('Pole wymagane')
        .max(5, 'Maksymalna ilość znaków: 5'),
    email: Yup.string()
        .required('Pole wymagane')
        .max(254, 'Maksymalna ilość znaków: 254'),
    position: Yup.string()
        .max(30, 'Maksymalna ilość znaków: 30'),
    roles: Yup.string()
        .required('Pole wymagane')

});

const SET_USERS = 'SET_USERS';
const ADD_USER = 'ADD_USER';
const UPDATE_USER = 'UPDATE_USER';

//actions
export function setRecords(records) {
    return {
        type: SET_USERS,
        payload: {
            records: records
        }
    }
}

export function addUserRecord(object) {
    return {
        type: ADD_USER,
        payload: object
    }
}

export function updateRecords(record) {
    return {
        type: UPDATE_USER,
        payload: {
            updatedRecord: record
        }
    }
}

export const addUser = (object) => {

    return (dispatch) => {
        axios.post(USERS, object)
            .then(function (response) {
                toastr.success('Użytkownik został utworzony');
                dispatch(addUserRecord(response.data));
            })
            .catch(function (error) {
                console.log(error);
                toastr.error(error.response.data['hydra:description']);
            });
    }
}


export const getAllUsers = (filters) => {

    let active = filters ? filters.active : null;

    return (dispatch) => {
        axios.get(USERS + '?active=' + active).then(response => {

            const data = response.data['hydra:member'].map(function (object) {
                return ({
                    ...object,
                    active: + object.active,
                    activeString: object.active === true ? 'tak' : 'nie',
                    role: object.userRoles[0].role
                    /*w aplikacji używamy tylko jendej roli ale istnieje 
                    możliwość zapisywania/pobierania wiekszej ilości ról uzytkownika*/
                })
            })
            dispatch(setRecords(data));
        });
    }
}

export const generateUserListForDropdown = (userList) => {

    let dropdownList = null

    if (userList.length > 0) {

        dropdownList = userList.map((object) => {
            return {
                'key': object.id,
                'text': object.firstname + ' ' + object.lastname,
                'value': object.id
            };
        });
    }

    return dropdownList;
}

export const updateRecord = (values) => {

    return (dispatch) => {
        axios.put(USERS + '/' + values.id, values).then((response) => {
            toastr.success('Dane zostały zmodyfikowane');
            dispatch(updateRecords(response.data));
        })
            .catch(function (error) {
                toastr.error(error.response.data['hydra:description']);
            });

    }
}

const initialState = {
    records: []
};

//reducers
export default (state = initialState, action) => {

    switch (action.type) {

        case SET_USERS: {
            return { ...state, ...action.payload };
        }

        case ADD_USER: {
            return { ...state, records: state.records ? [...state.records, action.payload] : [action.payload] }
        }

        /*
 
        case DELETE_USER: {
 
            let filteredArray = state.records.filter(item => item.id !== action.payload.deletedRecordId)
 
            return { ...state, records: filteredArray }
        }
        */
        case UPDATE_USER: {

            let index = state.records.findIndex(item => item.id === action.payload.updatedRecord.id);

            return {
                ...state,
                records: [
                    ...state.records.slice(0, index),
                    action.payload.updatedRecord,
                    ...state.records.slice(1 + index)
                ],
                updatedRecord: action.payload.updatedRecord
            }
        }

        //jeśli nie było żadnej akcji zwraca stan bez zmiany
        default: return state;
    }
}