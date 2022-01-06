const SHOW_LOADER = "SHOW_LOADER";
const HIDE_LOADER = "HIDE_LOADER";

export function showLoader() {
    return { type: SHOW_LOADER }
}

export function hideLoader() {
    return { type: HIDE_LOADER }
}


const initialState = {
    reqestsPending: 0,
    loading: false,
    communique: "Loading"
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER: {
            const reqestsPending = state.reqestsPending + 1;
            return { ...state, reqestsPending: reqestsPending, loading: true };
        }
        case HIDE_LOADER: {
            const reqestsPending = state.reqestsPending - 1;
            const loading = reqestsPending === 0 ? false : true;
            return { ...state, reqestsPending: reqestsPending, loading: loading };
        }
        default: return state;
    }
}