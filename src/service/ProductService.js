import axios from "axios";
import {useNavigate} from "react-router-dom";

export function saveProduct(product){
    return new Promise(resolve => {
       resolve(
           axios.post("http://localhost:8080/api/products", product).then(res =>{
               return true;
           }).catch(Error =>{
               return false;
           })
       )
    })
}

export function getProductById(id){
    return new Promise(resolve => {
        resolve(
            axios.get(`http://localhost:8080/api/products/merchant/${id}`).then(res =>{
                return res.data;
            }).catch(Error =>{
                return undefined;
            })
        )
    })
}

export function getAllProductByMerchant(id, name) {
    return new Promise(resolve => {
        resolve(
            axios.get(`http://localhost:8080/api/products/search?id_merchant=1&name=${name}`)
                .then(res => {
                    return res.data;
                })
                .catch(error => {
                    return undefined;
                })
        )
    })
}

export function deleteProduct(id_product){
    return new Promise(resolve => {
        resolve(
            axios.delete("http://localhost:8080/api/products/" + id_product).then(res =>{
                return true;
            }).catch(Error =>{
                return false;
            })
        )
    })
}
export const useHandleUpdate = () => {
    const navigate = useNavigate();
    const handleUpdate = (id_product) => {
        const updateUrl = `http://localhost:8080/api/products/merchant/${id_product}`;
        navigate(updateUrl);
    };
    return handleUpdate;
};
