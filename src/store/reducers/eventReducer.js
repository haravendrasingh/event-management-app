import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    events: [
        {
            eventName:'Webinar',
            description:'this Webinar is conducted by me',
            venue: 'agra',
            price: 1100,
            discount: 20
        }
    ]
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case actionTypes.ADD_EVENT:{
            console.log("payload====", payload)
            return {
                ...state,
                events: [...state.events, payload]
            }
        }
        default:
            return state
    }
}