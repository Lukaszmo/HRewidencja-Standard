import axios from 'axios';
import { USERS, USER_PROJECTS, ROLE_ACCESS_LIST } from '../../../routes';
import { parseObjectToString } from './../../utils/Utils';

const SET_USER = 'SET_USER';
const SET_INFERIORS = 'SET_INFERIORS';
const SET_USER_PROJECTS = 'SET_USER_PROJECTS';
const SET_USER_ITEMS = 'SET_USER_ITEMS';

//actions
export function setUserAction(user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export function setInferiors(inferiors) {
    return {
        type: SET_INFERIORS,
        payload: {
            inferiors: inferiors
        }
    }
}

export function setUserProjects(projectList) {
    return {
        type: SET_USER_PROJECTS,
        payload: {
            projectList: projectList
        }
    }
}

export function setUserRoleItems(items) {
    return {
        type: SET_USER_ITEMS,
        payload: {
            accessItems: items
        }
    }
}

//operations
export const getLoggedUser = (id) => {

    return (dispatch) => {
        return axios.get(USERS + '/' + id)
            .then((response) => {
                dispatch(setUserAction(response.data));
                //console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}


export async function getUserDetails(id) {

    const resp = axios.get(USERS + '/' + id)

    return await resp;
}

export const fetchInferiors = (managerId) => {

    return (dispatch) => {
        return axios.get(USERS + '?managerid=' + managerId).then(response => {

            dispatch(setInferiors(response.data['hydra:member']));
        });

    }
}

export const getUserProjects = (userId) => {

    return (dispatch) => {
        axios.get(USER_PROJECTS + '/' + userId).then(response => {

            let projectList = null;

            if (response.data.length > 0) {
                projectList = response.data.map(function (object) {
                    return ({
                        'key': object.id,
                        'text': object.description,
                        'value': object.id
                    })
                })
            }

            dispatch(setUserProjects(projectList));
        })
    }
}


export const generateUserListForDropdown = (listOfInferiors, loggedUser) => {

    let listOfUsers = null;

    if (typeof listOfInferiors != "undefined") {

        listOfUsers = listOfInferiors.map((object) => {
            return {
                key: object.id,
                value: object.id,
                text: object.firstname + ' ' + object.lastname
            };
        });

        const userName = loggedUser.firstname + ' ' + loggedUser.lastname;
        const loggedUserId = loggedUser.id;

        listOfUsers.push({ key: loggedUserId, text: userName, value: loggedUserId });
    }



    return listOfUsers;
};

export const getRoleItemList = (roleId) => {

    return (dispatch) => {

        axios.get(ROLE_ACCESS_LIST + '?role=' + roleId).then(response => {

            const data = response.data['hydra:member'].map(function (object) {
                return ({
                    item: object.item.code,
                    access: object.access
                })
            })
            localStorage.setItem('items', parseObjectToString(data));
            dispatch(setUserRoleItems(data));

        });
    }

}




const initialState = {
    id: "",
    regnum: "",
    firstname: "",
    lastname: "",
    position: "",
    email: ""
};

//reducers
export default (state = initialState, action) => {
    switch (action.type) {

        case SET_USER: {
            return { ...state, ...action.payload };
        }

        case SET_INFERIORS: {
            return { ...state, ...action.payload };

        }

        case SET_USER_PROJECTS: {
            return { ...state, ...action.payload };

        }

        case SET_USER_ITEMS: {
            return { ...state, ...action.payload };
        }

        default:
            return state;
    }
}






