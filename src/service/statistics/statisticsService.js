import request from "../../request";

export const listAll = ({month}) => {
    try {
        return request.get(`/statistics?month=${month}`,{
            headers:{
                'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
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
            headers:{
                'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
            }
        });
    } catch(error){
        console.log(error);
    }
};