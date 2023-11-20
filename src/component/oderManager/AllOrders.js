import {Link, useParams} from "react-router-dom";
import Header from "../../layout/Header";
import React, {useEffect, useState} from "react";
import {
    cancelBill,
    findAllOrdersByMerchant,
    groupByBill,
    searchByNameAndPhone,
    updateStatus
} from "../../service/BillService";
import {findAccountByMerchant} from "../../service/AccountService";
import SockJS from "sockjs-client";
import {over} from "stompjs";


let stompClient = null;

function AllOrders() {
    const account = JSON.parse(localStorage.getItem("userInfo"))
    let {id} = useParams();
    const [billDetail, setBillDetail] = useState([]);
    const [status, setStatus] = useState(true)
    useEffect(() => {
        findAllOrdersByMerchant(id).then(r => {
            setBillDetail(groupByBill(r))
            connect()
        })
    }, [status]);

    //websocket
    let receiver;
    const connect = () => {
        let Sock = new SockJS('http://localhost:8080/ws')
        stompClient = over(Sock)
        stompClient.connect({}, onConnected, onError);
    }
    const onConnected = () => {
        stompClient.subscribe('/user/' + account.username + account.id + '/private', onPrivateMessage);
    }
    const onPrivateMessage = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if (payloadData.sendAcc.id_account !== account.id) {
            setStatus(!status);
            console.log(payloadData)
        }
    }
    const onError = (err) => {
        console.log(err);
    }
    const handledSend = () => {
        console.log(receiver)
        if (stompClient) {
            var chatMessage = {
                sendAcc: {
                    id_account: account.id,
                    name: account.username
                },
                receiverAcc: {
                    id_account: receiver.id_account,
                    name: receiver.name
                },
                message: "true"
            };
            console.log(chatMessage);
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
        }
    }

    const search = () => {
        let value = document.getElementById("valueSearch").value;
        if (value === "") {
            findAllOrdersByMerchant(id).then(r => {
                setBillDetail(groupByBill(r))
                console.log(r)
            })
        } else {
            console.log(value)
            searchByNameAndPhone(id, value).then(r => {
                if (r !== undefined) {
                    setBillDetail(groupByBill(r))

                    console.log(r)
                } else {

                }
            })
        }
    }

    function handleCancel(id_bill, account) {
        receiver = account
        cancelBill(id_bill)
            .then(success => {
                if (success) {
                    handledSend()
                    setStatus(!status)
                    // The status was successfully updated
                    console.log('Bill status cancel successfully');
                } else {
                    // The status update failed
                    console.log('Failed to update bill status');
                }
            });
    }

    function handleConfirm(id_bill) {
        let status = {id_status : 2}
        updateStatus(id_bill, status)
            .then(success => {
                if (success) {
                    setStatus(!status)
                    // The status was successfully updated
                    console.log('Bill status updated successfully');
                } else {
                    // The status update failed
                    console.log('Failed to update bill status');
                }
            });
    }

    return (
        <>

            {/*Container */}
            <div className="mx-auto bg-grey-400">
                {/*hi*/}
                {/*Screen*/}
                <div className="min-h-screen flex flex-col">
                    {/*Header Section Starts Here*/}
                    <Header/>
                    {/*/Header*/}

                    <div className="flex flex-1">
                        {/*Sidebar*/}
                        <aside id="sidebar"
                               className="bg-side-nav w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block">

                            <ul className="list-reset flex flex-col">
                                <Link to={`/order-manager/${id}`}
                                      className="w-full h-full py-3 px-2 border-b border-light-border">
                                    <a href=""
                                       className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                        <i className="fas fa-tachometer-alt float-left mx-2"></i>
                                        Dashboard
                                        <span><i className="fas fa-angle-right float-right"></i></span>
                                    </a>
                                </Link>
                                <li style={{backgroundColor: '#efd6d6'}}
                                    className=" w-full h-full py-3 px-2 border-b border-light-border">
                                    <a
                                        className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                        <i className="fab fa-wpforms float-left mx-2"></i>
                                        All orders
                                        <span><i className="fa fa-angle-right float-right"></i></span>
                                    </a>
                                </li>
                                <li className="w-full h-full py-3 px-2 border-b border-light-border">
                                    <Link to={`/order-statistics/${id}`}
                                          className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                        <i className="fas fa-table float-left mx-2"></i>
                                        Order statistics
                                        <span><i className="fa fa-angle-right float-right"></i></span>
                                    </Link>
                                </li>
                                <li className="w-full h-full py-3 px-2 border-b border-light-border">
                                    <a href=""
                                       className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                        <i className="fas fa-grip-horizontal float-left mx-2"></i>
                                        Buttons
                                        <span><i className="fa fa-angle-right float-right"></i></span>
                                    </a>
                                </li>
                                <li className="w-full h-full py-3 px-2 border-b border-light-border">
                                    <a href=""
                                       className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                        <i className="fab fa-uikit float-left mx-2"></i>
                                        Ui components
                                        <span><i className="fa fa-angle-right float-right"></i></span>
                                    </a>
                                </li>
                                <li className="w-full h-full py-3 px-2 border-b border-300-border">
                                    <a href=""
                                       className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                        <i className="fas fa-square-full float-left mx-2"></i>
                                        Modals
                                        <span><i className="fa fa-angle-right float-right"></i></span>
                                    </a>
                                </li>
                                <li className="w-full h-full py-3 px-2">
                                    <a href="#"
                                       className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                        <i className="far fa-file float-left mx-2"></i>
                                        Pages
                                        <span><i className="fa fa-angle-down float-right"></i></span>
                                    </a>
                                    <ul className="list-reset -mx-2 bg-white-medium-dark">
                                        <li className="border-t mt-2 border-light-border w-full h-full px-2 py-3">
                                            <a href=""
                                               className="mx-4 font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                                Login Page
                                                <span><i className="fa fa-angle-right float-right"></i></span>
                                            </a>
                                        </li>
                                        <li className="border-t border-light-border w-full h-full px-2 py-3">
                                            <a href=""
                                               className="mx-4 font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                                Register Page
                                                <span><i className="fa fa-angle-right float-right"></i></span>
                                            </a>
                                        </li>
                                        <li className="border-t border-light-border w-full h-full px-2 py-3">
                                            <a href=""
                                               className="mx-4 font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                                404 Page
                                                <span><i className="fa fa-angle-right float-right"></i></span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </aside>
                        {/*/Sidebar*/}

                        {/*Main*/}
                        <main className="bg-white-300 flex-1 p-3 overflow-hidden">

                            <div className="flex flex-col">

                                {/* Card Sextion Starts Here */}
                                <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">

                                    {/* card */}
                                    <div className="rounded overflow-hidden shadow bg-white mx-2 w-full">


                                        <div className="rounded overflow-hidden shadow bg-white mx-2 w-full">
                                            <div
                                                className="px-6 py-2 border-b border-light-grey flex items-center justify-between">
                                                <div className="font-bold text-xl">All list orders</div>
                                                {/* search */}
                                                <div className="flex">
                                                    <div style={{width: '400px'}} className="font-bold text-xl">
                                                        <input
                                                            type="search"
                                                            className="form-control rounded"
                                                            placeholder="Search"
                                                            aria-label="Search"
                                                            aria-describedby="search-addon"
                                                            id="valueSearch"
                                                        />
                                                    </div>
                                                    <button onClick={search} style={{height: '37px'}}
                                                            className="ml-2 px-4 py-2 bg-blue-500 text-bg-dark rounded">
                                                        Search
                                                    </button>
                                                </div>
                                                {/* end search */}
                                            </div>
                                        </div>


                                        <div className="table-responsive">
                                            <table className="table text-grey-darkest">
                                                <thead className="bg-grey-dark text-white text-normal">
                                                <tr style={{textAlign: 'center'}}>
                                                    <th scope="col"></th>
                                                    <th scope="col">User Name</th>
                                                    <th scope="col">User Phone</th>
                                                    <th scope="col">Date of purchase</th>
                                                    <th scope="col">Product Name</th>
                                                    <th scope="col">Total Money (VND)</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {billDetail && billDetail.map && billDetail.map((item, index) => (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td style={{textAlign: 'center'}}>
                                                            <Link style={{
                                                                color: 'black',
                                                                fontSize: '19px',
                                                                textAlign: 'center'
                                                            }}>
                                                                {item.bill.account.name}<br/>
                                                            </Link><br/>
                                                        </td>
                                                        <td style={{textAlign: 'center'}}>{item.bill.account.phone}</td>
                                                        <td style={{textAlign: 'center'}}>{new Date(item.bill.time_purchase).toLocaleString(
                                                            'en-UK', {
                                                                year: 'numeric',
                                                                month: '2-digit',
                                                                day: '2-digit',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                            })}</td>
                                                        <td>{item.billDetails.map(item => {
                                                            return (
                                                                <>
                                                                    <p>{item.product.name}</p>
                                                                </>
                                                            )
                                                        })}</td>
                                                        <td style={{
                                                            fontWeight: 'bold',
                                                            color: '#a13d3d',
                                                            textAlign: 'center'
                                                        }}><span className="number">{item.total.toLocaleString()}</span>
                                                        </td>
                                                        <td style={{textAlign: 'center'}}>
                                                            <span className="number">{item.bill.status.name}</span>
                                                        </td>
                                                        <td style={{textAlign: 'center'}}>
                                                            {item.bill.status.id_status === 1 ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleConfirm(item.bill.id_bill)}
                                                                        className="btn btn-outline-danger">Confirm
                                                                    </button>
                                                                    <button style={{marginLeft: "10px"}}
                                                                            onClick={() => handleCancel(item.bill.id_bill, item.bill.account)}
                                                                            className="btn btn-outline-danger">Cancel
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div style={{width : "96px"}}></div>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    {/* /card */}

                                </div>
                                {/* /Cards Section Ends Here */}

                                {/* Progress Bar */}
                                <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 mt-2">
                                    <div className="rounded overflow-hidden shadow bg-white mx-2 w-full pt-2">
                                        <div className="px-6 py-2 border-b border-light-grey">
                                            <div className="font-bold text-xl">Progress Among Projects</div>
                                        </div>
                                        <div className="">
                                            <div className="w-full">

                                                <div className="shadow w-full bg-grey-light">
                                                    <div
                                                        className="bg-blue-500 text-xs leading-none py-1 text-center text-white"
                                                        style={{width: "45%"}}>45%
                                                    </div>
                                                </div>


                                                <div className="shadow w-full bg-grey-light mt-2">
                                                    <div
                                                        className="bg-teal-500 text-xs leading-none py-1 text-center text-white"
                                                        style={{width: "55%"}}>55%
                                                    </div>
                                                </div>


                                                <div className="shadow w-full bg-grey-light mt-2">
                                                    <div
                                                        className="bg-orange-500 text-xs leading-none py-1 text-center text-white"
                                                        style={{width: "65%"}}>65%
                                                    </div>
                                                </div>


                                                <div className="shadow w-full bg-grey-300 mt-2">
                                                    <div
                                                        className="bg-red-800 text-xs leading-none py-1 text-center text-white"
                                                        style={{width: "75%"}}>75%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Profile Tabs*/}
                                <div
                                    className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 p-1 mt-2 mx-auto lg:mx-2 md:mx-2 justify-between">
                                    {/*Top user 1*/}
                                    <div className="rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3">
                                        <img src="https://i.imgur.com/w1Bdydo.jpg" alt="" className="w-full"/>
                                        <div className="flex justify-center -mt-8">
                                            <img src="https://i.imgur.com/8Km9tLL.jpg" alt=""
                                                 className="rounded-full border-solid border-white border-2 -mt-3"/>
                                        </div>
                                        <div className="text-center px-3 pb-6 pt-2">
                                            <h3 className="text-black text-sm bold font-sans">Olivia Dunham</h3>
                                            <p className="mt-2 font-sans font-light text-grey-700">Hello, i'm from
                                                another the other
                                                side!</p>
                                        </div>
                                        <div className="flex justify-center pb-3 text-grey-dark">
                                            <div className="text-center mr-3 border-r pr-3">
                                                <h2>34</h2>
                                                <span>Photos</span>
                                            </div>
                                            <div className="text-center">
                                                <h2>42</h2>
                                                <span>Friends</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/*Top user 2*/}
                                    <div className="rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3">
                                        <img src="https://i.imgur.com/w1Bdydo.jpg" alt="" className="w-full"/>
                                        <div className="flex justify-center -mt-8">
                                            <img src="https://i.imgur.com/8Km9tLL.jpg" alt=""
                                                 className="rounded-full border-solid border-white border-2 -mt-3"/>
                                        </div>
                                        <div className="text-center px-3 pb-6 pt-2">
                                            <h3 className="text-black text-sm bold font-sans">Olivia Dunham</h3>
                                            <p className="mt-2 font-sans font-light text-grey-dark">Hello, i'm from
                                                another the other
                                                side!</p>
                                        </div>
                                        <div className="flex justify-center pb-3 text-grey-dark">
                                            <div className="text-center mr-3 border-r pr-3">
                                                <h2>34</h2>
                                                <span>Photos</span>
                                            </div>
                                            <div className="text-center">
                                                <h2>42</h2>
                                                <span>Friends</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/*Top user 3*/}
                                    <div className="rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3">
                                        <img src="https://i.imgur.com/w1Bdydo.jpg" alt="" className="w-full"/>
                                        <div className="flex justify-center -mt-8">
                                            <img src="https://i.imgur.com/8Km9tLL.jpg" alt=""
                                                 className="rounded-full border-solid border-white border-2 -mt-3"/>
                                        </div>
                                        <div className="text-center px-3 pb-6 pt-2">
                                            <h3 className="text-black text-sm bold font-sans">Olivia Dunham</h3>
                                            <p className="mt-2 font-sans font-light text-grey-dark">Hello, i'm from
                                                another the other
                                                side!</p>
                                        </div>
                                        <div className="flex justify-center pb-3 text-grey-dark">
                                            <div className="text-center mr-3 border-r pr-3">
                                                <h2>34</h2>
                                                <span>Photos</span>
                                            </div>
                                            <div className="text-center">
                                                <h2>42</h2>
                                                <span>Friends</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*/Profile Tabs*/}
                            </div>
                        </main>
                        {/*/Main*/}
                    </div>
                    {/*Footer*/}
                    <footer className="bg-grey-darkest text-white p-2">
                        <div className="flex flex-1 mx-auto">&copy; My Design</div>
                        <div className="flex flex-1 mx-auto">Distributed by: <a href="https://themewagon.com/"
                                                                                target=" _blank">Themewagon</a></div>
                    </footer>
                    {/*/footer*/}

                </div>

            </div>
        </>

    )

}

export default AllOrders;