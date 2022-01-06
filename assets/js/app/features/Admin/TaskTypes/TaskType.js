import axios from 'axios';
import { TASK_TYPES } from '../../../../routes';
import { toastr } from 'react-redux-toastr';

const SET_TASK_TYPES = 'SET_TASK_TYPES';

//actions
export function setTaskTypes(records) {
    return {
        type: SET_TASK_TYPES,
        payload: {
            records: records
        }
    }
}

export const getTaskTypes = () => {

    return (dispatch) => {
        axios.get(TASK_TYPES).then(response => {

            dispatch(setTaskTypes(response.data['hydra:member']));
        })
    }
}

export const generateTaskTypeListForDropdown = (taskTypeList) => {

    let dropdownList = null

    if (taskTypeList.length > 0) {

        dropdownList = taskTypeList.map((object) => {
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

        case SET_TASK_TYPES: {
            return { ...state, ...action.payload };
        }

        /*
        case ADD_TASK_TYPES: {
            return { ...state, records: state.records ? [...state.records, action.payload] : [action.payload] }
        }

        case DELETE_TASK_TYPES: {

            let filteredArray = state.records.filter(item => item.id !== action.payload.deletedRecordId)

            return { ...state, records: filteredArray }
        }

        case UPDATE_TASK_TYPES: {

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
        } */

        //jeśli nie było żadnej akcji zwraca stan bez zmiany
        default: return state;
    }
}