import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { PROJECT_TASKS, PROJECT_TASKS_API, PROJECT_TASKS_ADD } from '../../../../routes';
import * as Yup from 'yup';

export const ProjectTasksValidationSchema = Yup.object().shape({
    project: Yup.string()
        .required('Pole wymagane'),
    task: Yup.string()
        .required('Pole wymagane'),
});

const SET_PROJECT_TASKS = 'SET_PROJECT_TASKS';
const ADD_TASK_TO_PROJECT = 'ADD_TASK_TO_PROJECT'
const UPDATE_PROJECT_TASKS = 'UPDATE_PROJECT_TASKS';
const DELETE_TASK_FROM_PROJECT = 'DELETE_TASK_FROM_PROJECT';

//actions
export function setRecords(records) {
    return {
        type: SET_PROJECT_TASKS,
        payload: {
            records: records
        }
    }
}

export function addNewRecord(object) {
    return {
        type: ADD_TASK_TO_PROJECT,
        payload: object
    }
}

export function updateRecords(record) {
    return {
        type: UPDATE_PROJECT_TASKS,
        payload: {
            updatedRecord: record
        }
    }
}

export function deleteRecord(id) {
    return {
        type: DELETE_TASK_FROM_PROJECT,
        payload: {
            deletedRecordId: id
        }
    }
}


export const getAllTasksAssignedToProjects = () => {

    return (dispatch) => {
        axios.get(PROJECT_TASKS_API).then(response => {

            const data = response.data['hydra:member'].map(function (object) {
                return ({
                    ...object,
                    active: + object.active,
                    activeString: object.active === true ? 'tak' : 'nie',
                })
            })
            dispatch(setRecords(data));
        });
    }
}

export async function fetchProjectTasks(projectId) {

    const resp = axios.get(PROJECT_TASKS + '/' + projectId);

    return await resp;
}

export const addTaskToProject = (object) => {

    //  return function (dispatch) {
    axios.post(PROJECT_TASKS_ADD, object)
        .then(function (response) {
            toastr.success('Zadanie zostało dodane do projektu');
            // dispatch(addNewRecord(response.data));
        })
        .catch(function (error) {
            console.log(error);
            toastr.error(error.response.data['hydra:description']);
        });
    //  }
}

export const updateRecord = (values) => {

    return function (dispatch) {
        axios.put(PROJECT_TASKS_API + '/' + values.id, values).then((response) => {
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
        axios.delete(PROJECT_TASKS_API + '/' + rowId)
            .then(function (response) {
                toastr.success('Zadanie zostało usunięte z projektu');
                dispatch(deleteRecord(rowId));
            }).catch(function (error) {
                toastr.error(error.response.data['hydra:description']);
            });
    }
}



export const generateTasksForDropdown = (taskList) => {

    let dropdownList = null

    if (taskList.length > 0) {

        dropdownList = taskList.map((object) => {
            return {
                key: object.id,
                value: object.id,
                text: object.description
            };
        });
    }

    return dropdownList;
};

const initialState = {
    records: []
};

//reducers
export default (state = initialState, action) => {

    switch (action.type) {

        case SET_PROJECT_TASKS: {
            return { ...state, ...action.payload };
        }

        /* case ADD_TASK_TO_PROJECT: {
             return { ...state, records: state.records ? [...state.records, action.payload] : [action.payload] }
         }
         */

        case DELETE_TASK_FROM_PROJECT: {

            let filteredArray = state.records.filter(item => item.id !== action.payload.deletedRecordId)

            return { ...state, records: filteredArray }
        }

        case UPDATE_PROJECT_TASKS: {

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

