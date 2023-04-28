import request from "../../request";

const findCustomer = ({ name, page }) => {
  return request.get(
    `/api/customer?searchCode=${name ? name : ""}&searchName=${
      name ? name : ""
    }&searchPhoneNumber=${name ? name : ""}&page=${page ? page : "0"}`
  );
};

const customerForInvoiceService = {
  findCustomer,
};

export default customerForInvoiceService;
