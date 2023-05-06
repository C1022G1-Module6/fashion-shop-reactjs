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

export const dayProfit = ({month}) => {
    const token = localStorage.getItem('token')
    try {
        return request.get(`/statistics/profit?month=${month}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch(error){
        console.log(error);
    }
};

export const monthProfit = ({month}) => {
    const token = localStorage.getItem('token')
    try {
        return request.get(`/statistics/month-profit?month=${month ? month : ''}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch(error){
        console.log(error);
    }
};
