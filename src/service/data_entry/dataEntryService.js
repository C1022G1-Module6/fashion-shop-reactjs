import request from "../../request";

const findAll = () => {
    return request.get(`/data-entry`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    });
};

const update = (dataEntry) => {
    return request.put(`/data-entry`, {...dataEntry},{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    })
};

const getDetail = () => {
    return request.get(`/data-entry/detail`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    });
};

const remove = () => {
    return request.delete(`/data-entry`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    })
}

const dataEntryService = {
    findAll,
    update,
    getDetail,
    remove
};

export default dataEntryService;