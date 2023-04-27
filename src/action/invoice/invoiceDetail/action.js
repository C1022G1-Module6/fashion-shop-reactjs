import { INVOICE_DETAIL_DELETE_ACTION, INVOICE_DETAIL_LIST_ACTION } from "../../../action/invoice/invoiceDetail/type"
import invoiceDetailService from "../../../service/invoice/invoiceDetailService"

export const invoiceDetailListAction = () => async (dispatch) => {
    try {
        const response = await invoiceDetailService.findAll();
        dispatch ({
            type: INVOICE_DETAIL_LIST_ACTION,
            payload: response.data
        })
    } catch (error) {
        console.log(error);
    }
}