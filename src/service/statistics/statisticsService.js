import request from "../../request";

export const listAll = ({month}) => {
    const token = localStorage.getItem('token')
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
    const token = localStorage.getItem('token')
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

export const dayCost = ({month}) => {
    const token = localStorage.getItem('token')
    try {
        return request.get(`/statistics/cost?month=${month}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch(error){
        console.log(error);
    }
};

export const monthCost = ({month}) => {
    const token = localStorage.getItem('token')
    console.log(month);
    try {
        return request.get(`/statistics/month-cost?month=${month ? month : ''}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch(error){
        console.log(error);
    }
};