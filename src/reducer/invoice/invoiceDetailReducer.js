import { INVOICE_DETAIL_DELETE_ACTION, INVOICE_DETAIL_LIST_ACTION } from "../../action/invoice/invoiceDetail/type"

const initialState = [];

export const invoiceDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case INVOICE_DETAIL_LIST_ACTION:
            return action.payload
        case INVOICE_DETAIL_DELETE_ACTION: 
            return
        default:
            return state
    }
}