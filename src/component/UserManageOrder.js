import Header from "../layout/Header";
import Footer from "../layout/Footer";
import React, {useEffect, useState} from "react";
import {getAllBillDetailByAccount, groupByBill} from "../service/BillService";
import {toast, ToastContainer} from "react-toastify";
import {getList} from "../service/PageService";
import Pagination from "./pagination/Pagination";
import {Link} from "react-router-dom";


export default function UserManageOrder() {
    const account = JSON.parse(localStorage.getItem("userInfo"))
    const [billDetails, setBillDetails] = useState([])
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(true)
    const [changePage, setChangePage] = useState(false);

    useEffect(() => {
        getAllBillDetailByAccount(account.id).then(res => {
            if(res !== undefined){
                let arr = groupByBill(res)
                setBillDetails(getList(arr, page, limit));
                setList(arr)
            }else {
                setBillDetails([])
            }
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
                <div className="container">
                    {billDetails === undefined ?(
                        <>
                            <div style={{display :"flex", alignItems :"center", justifyContent: "center"}}>
                                <h3 style={{textAlign: "center", marginTop: "20vh", marginBottom: "20vh"}}>Your bill is empty.
                                    <Link to={"/"} style={{ fontStyle: 'italic', color : "#ff5757"}}> Go to shopping now!!!
                                    </Link>
                                </h3>
                            </div>
                        </>
                    ):(
                        <div>
                            <div style={{marginTop : "15px"}}>
                                <Pagination totalPage={totalPage} page={page} limit={limit} siblings={1}
                                            onPageChange={handlePageChange} onChangeItem={handleChangeItem}/>
                            </div>

                            <div className="content">
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Merchant</th>
                                        <th>Product</th>
                                        <th>Time purchase</th>
                                        <th>Total amount</th>
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
                                                <td>{new Date(bill.bill.time_purchase).toLocaleString(
                                                    'en-UK', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }
                                                )}</td>
                                                <td><span className="number">{bill.total.toLocaleString()} VND</span></td>
                                                <td>{bill.bill.status.name}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    )
}