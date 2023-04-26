import { combineReducers } from "redux";
import { invoiceDetailReducer } from "./invoice/invoiceDetailReducer";


export const rootReducer = combineReducers({
    invoiceDetailState: invoiceDetailReducer
})