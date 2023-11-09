import axios from "axios";

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
}e