import axios from 'axios';
import { ROLE_ACCESS_LIST } from '../../../../routes';
import { toastr } from 'react-redux-toastr';

//action types
const SET_ROLE_ACCESS_LIST = 'SET_ROLE_ACCESS_LIST';
const UPDATE_ROLE_ACCESS_LIST = 'UPDATE_ROLE_ACCESS_LIST';

//actions
export function setRecords(records) {
    return {
        type: SET_ROLE_ACCESS_LIST,
        payload: {
            records: records
        }
    }
}

export function updateRecords(record) {
    return {
        type: UPDATE_ROLE_ACCESS_LIST,
        payload: {
            updatedRecord: record
        }
    }
}


export const getRoleAccessList = () => {

    return (dispatch) => {

        axios.get(ROLE_ACCESS_LIST).then(response => {

            const data = response.data['hydra:member'].map(function (object) {
                return ({
                    ...object,
                    access: + object.access,
                    accessString: object.access === true ? 'tak' : 'nie'
                })
            })
            dispatch(setRecords(data));

        });
    }
}

export const updateRecord = (values) => {

    return function (dispatch) {
        axios.put(ROLE_ACCESS_LIST + '/' + values.id, values).then((response) => {
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

        case SET_ROLE_ACCESS_LIST: {
            return { ...state, ...action.payload };
        }

        case UPDATE_ROLE_ACCESS_LIST: {

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