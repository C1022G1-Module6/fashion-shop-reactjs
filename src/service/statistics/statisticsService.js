import request from "../../request";

const listAll = () => {
    try {
        return request.get(`/statistics`);
    } catch(error){
        console.log(error);
    }
};

export default listAll;