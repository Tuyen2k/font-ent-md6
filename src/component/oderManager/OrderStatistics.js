import {Link, useParams} from "react-router-dom";
import Header from "../../layout/Header";
import React, {useEffect, useState} from "react";
import {findAllOrdersByMerchant} from "../../service/BillService";
function OrderStatistics() {
    let {id} = useParams();
    const [billDetail, setBillDetail] = useState([]);
    useEffect(() => {
            findAllOrdersByMerchant(id).then(r => {
                setBillDetail(r)
                console.log(r)
            })
    }, []);
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
                                                $244
                                            </a>
                                            <a href="#" className="no-underline text-white text-lg">
                                                Total Sales
                                            </a>
                                        </div>
                                    </div>

                                    <div className="shadow bg-info border-l-8 hover:bg-info-dark border-info-dark mb-2 p-2 md:w-1/4 mx-2">
                                        <div className="p-4 flex flex-col">
                                            <a href="#" className="no-underline text-white text-2xl">
                                                $199.4
                                            </a>
                                            <a href="#" className="no-underline text-white text-lg">
                                                Total Cost
                                            </a>
                                        </div>
                                    </div>

                                    <div className="shadow bg-warning border-l-8 hover:bg-warning-dark border-warning-dark mb-2 p-2 md:w-1/4 mx-2">
                                        <div className="p-4 flex flex-col">
                                            <a href="#" className="no-underline text-white text-2xl">
                                                900
                                            </a>
                                            <a href="#" className="no-underline text-white text-lg">
                                                Total Users
                                            </a>
                                        </div>
                                    </div>

                                    <div className="shadow bg-success border-l-8 hover:bg-success-dark border-success-dark mb-2 p-2 md:w-1/4 mx-2">
                                        <div className="p-4 flex flex-col">
                                            <a href="#" className="no-underline text-white text-2xl">
                                                500
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
                                        <div className="px-6 py-2 border-b border-light-grey">
                                            <div className="font-bold text-xl">Statistics</div>
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
                                                        <td style={{textAlign: 'center'}}>{item.time_purchase}</td>
                                                        <td style={{textAlign: 'center'}}>{item.product.name}</td>
                                                        <td style={{
                                                            fontWeight: 'bold',
                                                            color: '#a13d3d',
                                                            textAlign: 'center'
                                                        }}>{item.price} </td>
                                                        <td style={{textAlign: 'center'}}>{item.bill.status.name}</td>
                                                        {/*<td>*/}
                                                        {/*    <span className="text-green-500"><i className="fas fa-arrow-up"></i>5%</span>*/}
                                                        {/*</td>*/}
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