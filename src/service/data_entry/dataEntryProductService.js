import request from "../../request";

const findAll = () => {
    return request.get(`/data-entry-product` ,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    });
};

const add = (dataEntryProduct) => {
    return request.post(`/data-entry-product`, {...dataEntryProduct},{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    })
}

const remove = (id) => {
    return request.delete(`/data-entry-product/${id}`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzMDY1MiwiZXhwIjoxNjgzMDE3MDUyfQ.EsOi2vxGbAPup5IAOZfyK-QtKTIwYtLpDGlnIm5FrZjN25RIGGC8uFzKvJVTQXyy5hZ2ag8cvHJ11PFC8ned6A'
        }
    });
};

const dataEntryProductService = {
    findAll,
    add,
    remove
}

export default dataEntryProductService;