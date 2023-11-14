import axios from "axios";

export function CouponByIdMerchant(id_merchant){
    return new Promise(resolve => {
        resolve(
            axios.get(`http://localhost:8080/api/coupons/${id_merchant}`).then(res =>{
                return res.data;
            }).catch(Error =>{
            })
        )
    })
}