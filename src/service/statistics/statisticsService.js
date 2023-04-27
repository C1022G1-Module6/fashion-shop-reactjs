import request from "../../request";

const listAll = ({month}) => {
    try {
        return request.get(`/statistics?month=${month}`);
    } catch(error){
        console.log(error);
    }
};

export default listAll;