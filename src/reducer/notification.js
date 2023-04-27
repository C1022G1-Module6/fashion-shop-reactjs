import { GET_ALL_NOTIFICATIONS, SHOW_DETAIL_NOTIFICATIONS, CREATE_NOTIFICATION, SHOW_NOTIFICATION } from './../action/types';

const initialState = []

export const notificationReducer = (notification = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_NOTIFICATIONS:
            return payload;

        case CREATE_NOTIFICATION:
            return [...notification, payload];

        default:
            return notification
    }
}

const initialDetailState = {
    notification: [],
    notificationDetail: null
}

export const showDetailNotification = (state = initialDetailState, action) => {
    switch (action.type) {
        case SHOW_DETAIL_NOTIFICATIONS:
            const id = action.payload
            const notificationDetail = state.notification.find(notify => notify.id === id)
            return{
                ...state,
                notificationDetail
            }

            default: 
            return state
    }

}



const initialStateShowNotification = false
export const showNotification = (state = initialStateShowNotification, action) => {
    const { type } = action;
    let newState = state;
    switch (type) {
        case SHOW_NOTIFICATION:
            newState = !state
            break;
        default:
            return state
    }
    return newState
}


