import request from "../../request";
const findAllSize = () => {
    return request.get(`/api/product-size`,{
        headers:{
            'Authorization' : 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmFucXVhbjEyMyIsImlhdCI6MTY4MjkzM' +
                'zI4OCwiZXhwIjoxNjgzMDE5Njg4fQ.mWYrOtwllKjWVYZouDjWV1Zs-GxJUCGQPDcWukMjJn1IJ49TcNY_50PxtBURyopl8ATjeA6okzl6NZXhNiDG4w'
        }
    })
}
const productSizeService = {
    findAllSize
}
export default productSizeService