import  {GET_ALL_NOTIFICATIONS, CREATE_NOTIFICATION, SHOW_NOTIFICATION, SHOW_DETAIL_NOTIFICATIONS} from './../action/types';
import notificationService from './../service/NotificationService';

export const getAllNotification = () => async(dispatch) => {
    try {
        const result = await notificationService.getAllNotification();
        dispatch({
                type:GET_ALL_NOTIFICATIONS,
                payload: result.data.content
        })
    } catch (error) {
        console.log(error);
    }

}


export const showDetailNotification = (id) => async(dispatch) =>{
    try {
        let result = await notificationService.findById(id);
        console.log(result)

        dispatch({
            type: SHOW_DETAIL_NOTIFICATIONS,
            payload: id
        })
        
    } catch (error) {
        
    }
}

export const createNotification = (values) => async(dispatch) =>{
    try {
        await notificationService.createNotification()
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: values
        })
    } catch (error) {
        console.log(error)

    }
}

export const showNotification = () => (dispatch) => {
    dispatch({
        type:SHOW_NOTIFICATION
    })

} 

