import request from "../../request";
const token = localStorage.getItem('token')
export const listAll = ({month}) => {
    try {
        return request.get(`/statistics?month=${month}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch(error){
        console.log(error);
    }
};

export const monthRevenue = ({month}) => {
    console.log(month);
    try {
        return request.get(`/statistics/month-revenue?month=${month ? month : ''}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch(error){
        console.log(error);
    }
};