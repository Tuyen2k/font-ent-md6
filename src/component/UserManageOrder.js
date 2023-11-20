import Header from "../layout/Header";
import Footer from "../layout/Footer";
import React, {useEffect, useState} from "react";
import {getAllBillDetailByAccount, groupByBill} from "../service/BillService";
import {toast, ToastContainer} from "react-toastify";
import {getList} from "../service/PageService";
import Pagination from "./pagination/Pagination";


export default function UserManageOrder() {
    const account = JSON.parse(localStorage.getItem("userInfo"))
    const [billDetails, setBillDetails] = useState([])
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(true)
    const [changePage, setChangePage] = useState(false);

    useEffect(() => {
        getAllBillDetailByAccount(account.id).then(res => {
            let arr = groupByBill(res)
            setBillDetails(getList(arr, page, limit));
            setList(arr)
            // setBillDetails(arr)
        })
    }, [check])

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const totalPage = Math.ceil(list.length / limit)
    if (totalPage !== 0 && page > totalPage) {
        setPage(totalPage)
    }
    const handleChangeItem = (value) => {
        setLimit(value)
        setChangePage(!changePage)
    }
    useEffect(() => {
        setBillDetails(getList(list, page, limit));
    }, [changePage])

    const handlePageChange = (value) => {
        if (value === "&laquo;" || value === " ...") {
            setPage(1)
        } else if (value === "&lsaquo;") {
            if (page !== 1) {
                setPage(page - 1)
            }
        } else if (value === "&raquo;" || value === "... ") {
            setPage(totalPage)
        } else if (value === "&rsaquo;") {
            if (page !== totalPage) {
                setPage(page + 1)
            }
        } else {
            setPage(value)
        }
        setChangePage(!changePage)
    }

    return (
        <>
            <Header/>
            <ToastContainer enableMultiContainer containerId={"account-bill"} position="top-right" autoClose={2000}
                            pauseOnHover={false}
                            style={{width: "400px"}}/>
            <div className="container">
                <h3>Manage Order</h3>
                <div className="container">
                    <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1}
                                onPageChange={handlePageChange} onChangeItem={handleChangeItem}/>
                    <div className="content">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Merchant</th>
                                <th>Product</th>
                                <th>Time purchase</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {billDetails.map((bill, index) =>{
                                return(
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{bill.bill.merchant.name}</td>
                                        <td>{bill.billDetails.map(item=>{
                                            return(
                                                <>
                                                    <p>{item.product.name}</p>
                                                </>
                                            )
                                        })}</td>
                                        <td>{bill.bill.time_purchase}</td>
                                        <td>{bill.billDetails.map(item =>{
                                            return(
                                                <>

                                                </>
                                            )
                                        })}</td>
                                        <td>{bill.bill.status.name}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    )
}