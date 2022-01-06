import axios from 'axios';
import { ASSIGNED_TASKS } from '../../../routes';
import { toastr } from 'react-redux-toastr';
import * as Yup from 'yup';

//action types
const SET_ASSIGNED_TASKS = 'SET_ASSIGNED_TASKS';
const ADD_ASSIGNED_TASK = 'ADD_ASSIGNED_TASK';
const UPDATE_ASSIGNED_TASK = 'UPDATE_ASSIGNED_TASK';

//actions
export function setRecords(records) {
    return {
        type: SET_ASSIGNED_TASKS,
        payload: {
            records: records
        }
    }
}

export function updateRecords(record) {
    return {
        type: UPDATE_ASSIGNED_TASK,
        payload: {
            updatedRecord: record
        }
    }
}

export const getAllAssignedTasks = () => {

    return (dispatch) => {

        axios.get(ASSIGNED_TASKS).then(response => {

            dispatch(setRecords(response.data['hydra:member']));

        });
    }
}

export const addRecord = (object) => {

    axios.post(ASSIGNED_TASKS, object)
        .then(function (response) {
            toastr.success('Zadanie zostało utworzone');
            //  dispatch(addNewRecord(response.data));
        })
        .catch(function (error) {
            console.log(error);
            toastr.error(error.response.data['hydra:description']);
        });

}

export const updateRecord = (values) => {

    return function (dispatch) {
        axios.put(ASSIGNED_TASKS + '/' + values.id, values).then((response) => {
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

        case SET_ASSIGNED_TASKS: {
            return { ...state, ...action.payload };
        }

        /*  case ADD_CLIENT: {
              return { ...state, records: state.records ? [...state.records, action.payload] : [action.payload] }
          }
  
          case DELETE_CLIENT: {
  
              let filteredArray = state.records.filter(item => item.id !== action.payload.deletedRecordId)
  
              return { ...state, records: filteredArray }
          } */

        case UPDATE_ASSIGNED_TASK: {

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