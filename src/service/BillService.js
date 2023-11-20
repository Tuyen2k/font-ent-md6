import axios from "axios";


export function addBill(cartDetail){
    return new Promise(require =>{
        require(
            axios.post("http://localhost:8080/api/bill/order",cartDetail).then(res=>{
                return true
            }).catch(Error =>{
                return false
            })
        )
    })
}

export function orderNow(product, id_account){
    return new Promise(require =>{
        require(
            require(
                axios.post(`http://localhost:8080/api/bill/order-now/${id_account}`,product).then(res=>{
                    console.log(res)
                    return true
                }).catch(Error =>{
                    return false
                })
            )
        )
    })
}

export function getAllBillDetailByAccount(id_account){
    return new Promise(resolve => {
        resolve(
            axios.get(`http://localhost:8080/api/bill/all/account/${id_account}`).then(res =>{
                return res.data;
            }).catch(Error=>{
                return undefined;
            })
        )
    })
}
export function groupByBill(list){
    let arr = []
    let count = 0
    let a = {bill : list[0].bill, billDetails : [list[0]], total : list[0].quantity * list[0].price}
    arr.push(a)
    for (let i = 1; i < list.length; i++) {
        if (list[i].bill.id_bill === arr[count].bill.id_bill){
            arr[count].billDetails.push(list[i])
            arr[count].total +=list[i].quantity * list[i].price
        }else {
            arr.push({bill : list[i].bill, billDetails : [list[i]], total : list[i].quantity * list[i].price})
            count ++;
        }
    }

    return arr;
}