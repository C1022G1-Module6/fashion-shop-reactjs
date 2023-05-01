import request from "../../request";

export const listAll = ({month}) => {
    try {
        return request.get(`/statistics?month=${month}`);
    } catch(error){
        console.log(error);
    }
};

export const monthRevenue = ({month}) => {
    console.log(month);
    try {
        return request.get(`/statistics/month-revenue?month=${month}`);
    } catch(error){
        console.log(error);
    }
};