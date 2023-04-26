import {useEffect, useState} from "react";
import productTypeService from "../../service/product/ProductTypeService";

function ListProduct() {
const [products,setProducts] = useState([]);
const [productTypes, setProductTypes] = useState([]);
const [pageCount,setPageCount] = useState(0);
const [productDetail,setProductDetails] = useState([]);
useEffect( ()=> {
    const getProductType = async () => {
        const productTypeData = await productTypeService.findAllType();
        setProductTypes(productTypeData.data);
    };
    getProductType()
},[]);

useEffect(() => {

})


}