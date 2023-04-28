import { combineReducers } from "redux";
import { invoiceDetailReducer } from "./invoice/invoiceDetailReducer";

// import { combineReducers } from "redux";
// import { notificationReducer , showNotification, showDetailNotification } from "./notification";


export const rootReducer = combineReducers({
    invoiceDetailState: invoiceDetailReducer
})
// export const rootReducer = combineReducers({
//     notifications: notificationReducer,
//     show: showNotification,
//     showDetail: showDetailNotification

// })

