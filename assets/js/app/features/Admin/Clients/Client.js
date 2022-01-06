import axios from 'axios';
import { CLIENTS } from '../../../../routes';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';

export const ClientValidationSchema = Yup.object().shape({
    code: Yup.string()
        .required('Pole wymagane')
        .max(10, 'Maksymalna ilość znaków: 10'),
    description: Yup.string()
        .required('Pole wymagane')
        .max(50, 'Maksymalna ilość znaków: 50'),
});

//action types
const SET_CLIENTS = 'SET_CLIENTS';
const ADD_CLIENT = 'ADD_CLIENT';
const UPDATE_CLIENT = 'UPDATE_CLIENT';
const DELETE_CLIENT = 'DELETE_CLIENT';

//actions
export function setRecords(records) {
    return {
        type: SET_CLIENTS,
        payload: {
            records: records
        }
    }
}

export function addNewRecord(object) {
    return {
        type: ADD_CLIENT,
        payload: object
    }
}

export function updateRecords(record) {
    return {
        type: UPDATE_CLIENT,
        payload: {
            updatedRecord: record
        }
    }
}

export function deleteRecord(id) {
    return {
        type: DELETE_CLIENT,
        payload: {
            deletedRecordId: id
        }
    }
}

export const addRecord = (object) => {

    return function (dispatch) {
        axios.post(CLIENTS, object)
            .then(function (response) {
                toastr.success('Klient został utworzony');
                dispatch(addNewRecord(response.data));
            })
            .catch(function (error) {
                console.log(error);
                toastr.error(error.response.data['hydra:description']);
            });
    }
}

export const getAllClients = () => {

    return (dispatch) => {

        axios.get(CLIENTS).then(response => {

            dispatch(setRecords(response.data['hydra:member']));

        });
    }
}

export const updateRecord = (values) => {

    return function (dispatch) {
        axios.put(CLIENTS + '/' + values.id, values).then((response) => {
            toastr.success('Dane zostały zmodyfikowane');
            dispatch(updateRecords(response.data));
        })
            .catch(function (error) {
                toastr.error(error.response.data['hydra:description']);
            });
    }
}

export const removeRecord = (rowId) => {

    return function (dispatch) {
        axios.delete(CLIENTS + '/' + rowId)
            .then(function (response) {
                toastr.success('Klient został usunięty');
                dispatch(deleteRecord(rowId));
            }).catch(function (error) {
                toastr.error(error.response.data['hydra:description']);
            });
    }
}

export const generateClientListForDropdown = (clientList) => {

    let dropdownList = null

    if (clientList.length > 0) {

        dropdownList = clientList.map((object) => {
            return {
                'key': object.id,
                'text': object.description,
                'value': object.id
            };
        });
    }

    return dropdownList;
}

const initialState = {
    records: []
};

//reducers
export default (state = initialState, action) => {

    switch (action.type) {

        case SET_CLIENTS: {
            return { ...state, ...action.payload };
        }

        case ADD_CLIENT: {
            return { ...state, records: state.records ? [...state.records, action.payload] : [action.payload] }
        }

        case DELETE_CLIENT: {

            let filteredArray = state.records.filter(item => item.id !== action.payload.deletedRecordId)

            return { ...state, records: filteredArray }
        }

        case UPDATE_CLIENT: {

            let index = state.records.findIndex(item => item.id === action.payload.updatedRecord.id);

            return {
                ...state,
                records: [
                    ...state.records.slice(0, index),      // wycina to co przed indexem
                    action.payload.updatedRecord,          // wrzuca rekord
                    ...state.records.slice(1 + index)      // dodaje to co pozostało
                ],
                updatedRecord: action.payload.updatedRecord
            }
        }

        //jeśli nie było żadnej akcji zwraca stan bez zmiany
        default: return state;
    }
}