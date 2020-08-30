import * as actionTypes from '../../constants/actionTypes';


export const addEvent = (data) => (dispatch) => {
    dispatch({
        type: actionTypes.ADD_EVENT,
        payload: data
    })
}