import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { PROJECT_USERS } from '../../../../routes';
import * as Yup from 'yup';

export const ProjectUsersValidationSchema = Yup.object().shape({
    project: Yup.string()
        .required('Pole wymagane'),
    user: Yup.string()
        .required('Pole wymagane'),
});

const SET_USER_PROJECTS = 'SET_USER_PROJECTS';
const ADD_USER_TO_PROJECT = 'ADD_USER_TO_PROJECT';
const UPDATE_USER_PROJECTS = 'UPDATE_USER_PROJECTS';
const DELETE_USER_FROM_PROJECT = 'DELETE_USER_FROM_PROJECT';

//actions
export function setRecords(records) {
    return {
        type: SET_USER_PROJECTS,
        payload: {
            records: records
        }
    }
}

export function addNewRecord(object) {
    return {
        type: ADD_USER_TO_PROJECT,
        payload: object
    }
}

export function updateRecords(record) {
    return {
        type: UPDATE_USER_PROJECTS,
        payload: {
            updatedRecord: record
        }
    }
}

export function deleteRecord(id) {
    return {
        type: DELETE_USER_FROM_PROJECT,
        payload: {
            deletedRecordId: id
        }
    }
}


export const getAllUsersAssignedToProjects = () => {

    return (dispatch) => {
        axios.get(PROJECT_USERS).then(response => {

            const data = response.data['hydra:member'].map(function (object) {
                return ({
                    ...object,
                    active: + object.active,
                    activeString: object.active === true ? 'tak' : 'nie',
                    fullname: object.user.firstname + ' ' + object.user.lastname
                })
            })
            dispatch(setRecords(data));
        });
    }
}


export const addUserToProject = (object) => {

    return function (dispatch) {
        axios.post(PROJECT_USERS, object)
            .then(function (response) {
                toastr.success('Pracownik został dodany do projektu');
                dispatch(addNewRecord(response.data));
            })
            .catch(function (error) {
                console.log(error);
                toastr.error(error.response.data['hydra:description']);
            });
    }
}

export const updateRecord = (values) => {

    return function (dispatch) {
        axios.put(PROJECT_USERS + '/' + values.id, values).then((response) => {
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
        axios.delete(PROJECT_USERS + '/' + rowId)
            .then(function (response) {
                toastr.success('Pracownik został usunięty z projektu');
                dispatch(deleteRecord(rowId));
            }).catch(function (error) {
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

        case SET_USER_PROJECTS: {
            return { ...state, ...action.payload };
        }

        case ADD_USER_TO_PROJECT: {
            return { ...state, records: state.records ? [...state.records, action.payload] : [action.payload] }
        }

        case DELETE_USER_FROM_PROJECT: {

            let filteredArray = state.records.filter(item => item.id !== action.payload.deletedRecordId)

            return { ...state, records: filteredArray }
        }

        case UPDATE_USER_PROJECTS: {

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