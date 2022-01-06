import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { PROJECTS } from '../../../../routes';
import * as Yup from 'yup';

export const ProjectValidationSchema = Yup.object().shape({
    client: Yup.string()
        .required('Pole wymagane'),
    code: Yup.string()
        .required('Pole wymagane')
        .max(10, 'Maksymalna ilość znaków: 10'),
    description: Yup.string()
        .required('Pole wymagane')
        .max(50, 'Maksymalna ilość znaków: 50'),
});

const SET_PROJECTS = 'SET_PROJECTS';
const ADD_PROJECT = 'ADD_PROJECT';
const UPDATE_PROJECT = 'UPDATE_PROJECT';
const DELETE_PROJECT = 'DELETE_PROJECT';

//actions
export function setRecords(records) {
    return {
        type: SET_PROJECTS,
        payload: {
            records: records
        }
    }
}

export function addNewRecord(object) {
    return {
        type: ADD_PROJECT,
        payload: object
    }
}

export function updateRecords(record) {
    return {
        type: UPDATE_PROJECT,
        payload: {
            updatedRecord: record
        }
    }
}

export function deleteRecord(id) {
    return {
        type: DELETE_PROJECT,
        payload: {
            deletedRecordId: id
        }
    }
}

export const getAllProjects = (filters) => {

    let active = filters ? filters.active : null;

    return (dispatch) => {
        axios.get(PROJECTS + '?active=' + active).then(response => {

            const data = response.data['hydra:member'].map(function (object) {
                return ({
                    ...object,
                    active: + object.active,
                    activeString: object.active === true ? 'tak' : 'nie'
                })
            })
            dispatch(setRecords(data));
        });
    }
}

export const addRecord = (object) => {

    return function (dispatch) {
        axios.post(PROJECTS, object)
            .then(function (response) {
                toastr.success('Projekt został utworzony');
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
        axios.put(PROJECTS + '/' + values.id, values).then((response) => {
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
        axios.delete(PROJECTS + '/' + rowId)
            .then(function (response) {
                toastr.success('Projekt został usunięty');
                dispatch(deleteRecord(rowId));
            }).catch(function (error) {
                toastr.error(error.response.data['hydra:description']);
            });
    }
}

export const generateProjectListForDropdown = (projectList) => {

    let dropdownList = null

    if (projectList.length > 0) {

        dropdownList = projectList.map((object) => {
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

        case SET_PROJECTS: {
            return { ...state, ...action.payload };
        }

        case ADD_PROJECT: {
            return { ...state, records: state.records ? [...state.records, action.payload] : [action.payload] }
        }

        case DELETE_PROJECT: {

            let filteredArray = state.records.filter(item => item.id !== action.payload.deletedRecordId)

            return { ...state, records: filteredArray }
        }

        case UPDATE_PROJECT: {

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