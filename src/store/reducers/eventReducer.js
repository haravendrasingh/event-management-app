import * as actionTypes from '../../constants/actionTypes';

const initialState = {
    events: [
        {
            eventName:'abc1',
            description:'fnjkenfkewnfmnwkfwf fwnfjwnfrw',
            venue: 'bangalore',
            price: 1100,
            discount: 20
        },
        {
            eventName:'abc2',
            description:'fnjkenfkewnfmnwkfwf fwnfjwnfrw',
            venue: 'agra',
            price: 1000,
            discount: 0
        },
        {
            eventName:'abc3',
            description:'fnjkenfkewnfmnwkfwf fwnfjwnfrw',
            venue: 'delhi',
            price: 0,
            discount: 0
        },
        {
            eventName:'abc3',
            description:'fnjkenfkewnfmnwkfwf fwnfjwnfrw',
            venue: 'delhi',
            price: 1200,
            discount: 100
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