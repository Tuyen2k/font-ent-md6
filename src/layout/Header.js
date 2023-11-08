export default function Header() {


    return (
        <>
            <header>
                {/*Topbar*/}
                <nav className="info-navbar">
                    <section className="topbar-wrapper">
                        <div className="container">
                            <div className="row text-lg-left">
                                <div className="col-md-6 d-none d-lg-block">
                                    <div className="d-inline-flex align-items-center">
                                        <a className="text-dark" href="">FAQs</a>
                                        <span className="text-muted px-2">|</span>
                                        <a className="text-dark" href="">Help</a>
                                        <span className="text-muted px-2">|</span>
                                        <a className="text-dark" href="">Support</a>
                                    </div>
                                </div>
                                <div className="col-md-6 text-lg-right">
                                    <div className="d-inline-flex align-items-center">
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-twitter"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-linkedin-in"></i>
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                        <a className="text-dark pl-2" href="">
                                            <i className="fab fa-youtube"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*End Topbar*/}
                </nav>
                <nav className="navbar">
                    {/*Navbar*/}
                    <section className="container">
                        {/*Logo*/}
                        <a href="" className="logo" style={{backgroundImage:`url("https://firebasestorage.googleapis.com/v0/b/react-firebase-storage-f6ec9.appspot.com/o/file%2Flogo--web.png?alt=media&token=372f9a0c-25f3-4f56-9019-21ba8c8e607a")`}}></a>
                        {/*Menu-Nav*/}
                        <div className="user-nav-menu">

                            {/*City Select*/}
                            <div className="btn-nav-city-select">
                                Hà Nội
                                <i className="fa-solid fa-sort-down"></i>
                                <ul className="menu-nav-city-select">
                                    <li className="city-item">Hồ Chí Minh</li>
                                    <li className="city-item">Hải Phòng</li>
                                    <li className="city-item">Đà Nẵng</li>
                                </ul>
                            </div>
                            {/*End City Select*/}

                            {/*Menu Item*/}
                            <a href="" className="btn-nav-link">New Location</a>
                            <a href="" className="btn-nav-link">Hot Deals</a>
                            <a href="" className="btn-nav-link">Popular Brands</a>
                            <a href="" className="btn-nav-link">Nearby Location</a>
                            <a href="" className="btn-nav-link">Recently Order</a>
                            <a href="" className="btn-nav-link">Healthy Choices</a>
                            <a href="" className="btn-nav-link">Vegan Location</a>

                            {/*End Menu Item*/}
                            <div className="blank"></div>
                            {/*Login*/}
                            <div className="user-nav-menu text-lg-right">
                                <div className="nav-item user-panel">
                                    <div className="user-panel">
                                        <span className="btn bg-light-gray text-black btn-login">Login</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Menu Navbar*/}
                    </section>
                    {/*End Navbar*/}
                </nav>
            </header>
        </>
    )
}