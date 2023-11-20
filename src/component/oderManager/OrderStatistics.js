import {Link, useParams} from "react-router-dom";
import Header from "../../layout/Header";
import React, {useEffect, useState} from "react";
import {
    findAllBillByMerchant,
    findAllOrdersByMerchant,
    findOrderByProduct, findOrderByStatus, findOrderByUser, findUser,
    getAllStatus,
    groupByBill
} from "../../service/BillService";
import {getAllProductByIdMerchant} from "../../service/ProductService";
function OrderStatistics() {
    let {id} = useParams();
    const [billDetail, setBillDetail] = useState([]);
    const [status, setStatus] = useState([]);
    const [user, setUser] = useState([]);
    const [product, setProduct] = useState([]);
    const [check, setCheck] = useState(true);
    const [message, setMessage] = useState("");
    const [totalMoNey, setTotalMoNey] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalUser, setTotalUser] = useState(0);
    useEffect(() => {
        if (check){
            findAllOrdersByMerchant(id).then(r => {
                setBillDetail(groupByBill(r))
                order(r.length)
                money(r)
                setMessage("Statistics")
            })
        }
        getAllProductByIdMerchant(id).then(re => {
            setProduct(re)
            setTotalProduct(re.length)
        })
        getAllStatus().then(res => {
            setStatus(res)
        })

        findUser(id).then(r => {
            setUser(r.reverse())
            setTotalUser(r.length)
        })
    }, [check]);


    const selectProduct = (e) => {
        findOrderByProduct(e.target.value).then(r => {
            if (r !== undefined){
                setBillDetail(groupByBill(r))
                money(r)
                order(r.length)
                setMessage("Search By Product")
                setCheck(false)
            } else {
                setCheck(true)
            }
        })
    }

    const selectStatus = (e) => {
        findOrderByStatus(id, e.target.value).then(r => {
            if (r !== undefined){
                setBillDetail(groupByBill(r))
                money(r)
                order(r.length)
                setMessage("Search By Status")
                setCheck(false)
            } else {
                setCheck(true)
            }
        })
    }

    const selectUser = (e) => {
        findOrderByUser(id, e.target.value).then(r => {
            if (r !== undefined){
                setBillDetail(groupByBill(r))
                money(r)
                order(r.length)
                setMessage("Search By User")
                setCheck(false)
                console.log(r)
            } else {
                setCheck(true)
            }
        })
    }

    const money = (r) => {
        let count = 0;
        for (let i = 0; i < r.length; i++) {
            count += r[i].price
        }
        setTotalMoNey(count)
    }

    const order = (r) => {
        setTotalOrder(r)
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
                        <aside id="sidebar" className="bg-side-nav w-1/2 md:w-1/6 lg:w-1/6 border-r border-side-nav hidden md:block lg:block">

                            <ul className="list-reset flex flex-col">
                                <li className=" w-full h-full py-3 px-2 border-b border-light-border">
                                    <Link to={`/order-manager/${id}`}
                                       className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                        <i className="fas fa-tachometer-alt float-left mx-2"></i>
                                        Dashboard
                                        <span><i className="fas fa-angle-right float-right"></i></span>
                                    </Link>
                                </li>
                                <li className="w-full h-full py-3 px-2 border-b border-light-border">
                                    <Link to={`/all-order/${id}`}
                                          className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                        <i className="fab fa-wpforms float-left mx-2"></i>
                                        All orders
                                        <span><i className="fa fa-angle-right float-right"></i></span>
                                    </Link>
                                </li>
                                <li style={{backgroundColor: '#efd6d6'}} className="w-full h-full py-3 px-2 border-b border-light-border">
                                    <a
                                       className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
                                        <i className="fas fa-table float-left mx-2"></i>
                                        Order statistics
                                        <span><i className="fa fa-angle-right float-right"></i></span>
                                    </a>
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
                                    <a href="" className="font-sans font-hairline hover:font-normal text-sm text-nav-item no-underline">
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
                                {/* Stats Row Starts Here */}
                                <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">
                                    <div className="shadow-lg bg-red-vibrant border-l-8 hover:bg-red-vibrant-dark border-red-vibrant-dark mb-2 p-2 md:w-1/4 mx-2">
                                        <div className="p-4 flex flex-col">
                                            <a href="#" className="no-underline text-white text-2xl">
                                                <span className="number">{totalMoNey.toLocaleString()}</span>
                                                 VND
                                            </a>
                                            <a href="#" className="no-underline text-white text-lg">
                                                Total Money
                                            </a>
                                        </div>
                                    </div>

                                    <div className="shadow bg-info border-l-8 hover:bg-info-dark border-info-dark mb-2 p-2 md:w-1/4 mx-2">
                                        <div className="p-4 flex flex-col">
                                            <a href="#" className="no-underline text-white text-2xl">
                                                {totalOrder} orders
                                            </a>
                                            <a href="#" className="no-underline text-white text-lg">
                                                Total Oder
                                            </a>
                                        </div>
                                    </div>

                                    <div className="shadow bg-warning border-l-8 hover:bg-warning-dark border-warning-dark mb-2 p-2 md:w-1/4 mx-2">
                                        <div className="p-4 flex flex-col">
                                            <a href="#" className="no-underline text-white text-2xl">
                                                {totalUser} Users
                                            </a>
                                            <a href="#" className="no-underline text-white text-lg">
                                                Total Users
                                            </a>
                                        </div>
                                    </div>

                                    <div className="shadow bg-success border-l-8 hover:bg-success-dark border-success-dark mb-2 p-2 md:w-1/4 mx-2">
                                        <div className="p-4 flex flex-col">
                                            <a href="#" className="no-underline text-white text-2xl">
                                                {totalProduct} Products
                                            </a>
                                            <a href="#" className="no-underline text-white text-lg">
                                                Total Products
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* /Stats Row Ends Here */}

                                {/* Card Sextion Starts Here */}
                                <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2">

                                    {/* card */}

                                    <div className="rounded overflow-hidden shadow bg-white mx-2 w-full">
                                        <div className="flex items-center px-6 py-2 border-b border-light-grey">
                                            <div className="font-bold text-xl" style={{width: '250px'}}>{message}</div>
                                            <div style={{marginLeft: '500px', width: '300px'}} className="ml-4"> {/* Thêm margin-left để tạo khoảng cách giữa div và select */}
                                                <select onChange={selectProduct} value="optionProduct" className="form-select">
                                                    <option>Product</option>
                                                    {product && product.map(item => (
                                                        <option value={item.id_product}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div style={{marginLeft: '30px', width: '300px'}} className="ml-4"> {/* Thêm margin-left để tạo khoảng cách giữa div và select */}
                                                <select onChange={selectUser} className="form-select">
                                                    <option>User</option>
                                                    {user && user.map(item => (
                                                        <option value={item.account.id_account}>{item.account.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div style={{marginLeft: '30px', width: '300px'}} className="ml-4"> {/* Thêm margin-left để tạo khoảng cách giữa div và select */}
                                                <select onChange={selectStatus} value="optionStatus" className="form-select">
                                                    <option>Status</option>
                                                    {status && status.map(item => (
                                                        <option value={item.id_status}>{item.name}</option>
                                                    ))}
                                                </select>
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
                                                        <td>{item.billDetails.map(item=>{
                                                            return(
                                                                <>
                                                                    <p>{item.product.name}</p>
                                                                </>
                                                            )
                                                        })}</td>
                                                        <td style={{
                                                            fontWeight: 'bold',
                                                            color: '#a13d3d',
                                                            textAlign: 'center'
                                                        }}><span className="number">{item.total.toLocaleString()}</span> </td>
                                                        <td style={{textAlign: 'center'}}>
                                                            <span className="number">{item.bill.status.name}</span>
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
                                                    <div className="bg-blue-500 text-xs leading-none py-1 text-center text-white"
                                                         style={{width: "45%"}}>45%
                                                    </div>
                                                </div>


                                                <div className="shadow w-full bg-grey-light mt-2">
                                                    <div className="bg-teal-500 text-xs leading-none py-1 text-center text-white"
                                                         style={{width: "55%"}}>55%
                                                    </div>
                                                </div>


                                                <div className="shadow w-full bg-grey-light mt-2">
                                                    <div className="bg-orange-500 text-xs leading-none py-1 text-center text-white"
                                                         style={{width: "65%"}}>65%
                                                    </div>
                                                </div>


                                                <div className="shadow w-full bg-grey-300 mt-2">
                                                    <div className="bg-red-800 text-xs leading-none py-1 text-center text-white"
                                                         style={{width: "75%"}}>75%
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*Profile Tabs*/}
                                <div className="flex flex-1 flex-col md:flex-row lg:flex-row mx-2 p-1 mt-2 mx-auto lg:mx-2 md:mx-2 justify-between">
                                    {/*Top user 1*/}
                                    <div className="rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3">
                                        <img src="https://i.imgur.com/w1Bdydo.jpg" alt="" className="w-full"/>
                                        <div className="flex justify-center -mt-8">
                                            <img src="https://i.imgur.com/8Km9tLL.jpg" alt=""
                                                 className="rounded-full border-solid border-white border-2 -mt-3"/>
                                        </div>
                                        <div className="text-center px-3 pb-6 pt-2">
                                            <h3 className="text-black text-sm bold font-sans">Olivia Dunham</h3>
                                            <p className="mt-2 font-sans font-light text-grey-700">Hello, i'm from another the other
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
                                            <p className="mt-2 font-sans font-light text-grey-dark">Hello, i'm from another the other
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
                                            <p className="mt-2 font-sans font-light text-grey-dark">Hello, i'm from another the other
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
                        <div className="flex flex-1 mx-auto">Distributed by:  <a href="https://themewagon.com/" target=" _blank">Themewagon</a></div>
                    </footer>
                    {/*/footer*/}

                </div>

            </div>
        </>

    )

}

export default OrderStatistics;