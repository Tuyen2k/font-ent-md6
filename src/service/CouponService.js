import axios from "axios";

<<<<<<< HEAD
export function CouponByIdMerchant(id_merchant){
=======
export function couponByIdMerchant(id_merchant){
>>>>>>> 70c31dc9bd1de1b7f200a866ed2f0f1934ee0400
    return new Promise(resolve => {
        resolve(
            axios.get(`http://localhost:8080/api/coupons/${id_merchant}`).then(res =>{
                return res.data;
            }).catch(Error =>{
            })
        )
    })
<<<<<<< HEAD
=======
}

export function findOneCoupon(id_coupon){
    return new Promise(resolve => {
        resolve(
            axios.get(`http://localhost:8080/api/coupons/findOne/${id_coupon}`).then(res =>{
                return res.data;
            }).catch(Error =>{
            })
        )
    })
}

export function saveCoupon(coupon){
    return new Promise(resolve => {
        resolve(
            axios.post(`http://localhost:8080/api/coupons/create`, coupon).then(res =>{
                return true
            }).catch(Error =>{
                return false
            })
        )
    })
}

export function editCoupon(coupon){
    return new Promise(resolve => {
        resolve(
            axios.put(`http://localhost:8080/api/coupons/update`, coupon).then(res =>{
                return true
            }).catch(Error =>{
                return false
            })
        )
    })
}

export function deleteCoupon(id){
    return new Promise(resolve => {
        resolve(
            axios.delete(`http://localhost:8080/api/coupons/${id}`,).then(res =>{
                return true
            }).catch(Error =>{
                return false
            })
        )
    })
>>>>>>> 70c31dc9bd1de1b7f200a866ed2f0f1934ee0400
}