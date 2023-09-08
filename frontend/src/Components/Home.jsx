import React from "react";
import "../Css/style.css";
import "../Css/responsive.css";
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
    const { state, dispatch } = useContext(AuthContext)
    const router = useNavigate()
    const LOGOUT = () => {
        dispatch({ type: "LOGOUT" })
        router('/')
    }
    return (
        <div>

            <>
                <div id="screen">
                    <div className="section-1">
                        <div className="left-side">
                            <div className="content-wrapper">
                                <div className="logo-login-signup">
                                    <a href="./index.html" className="logo">
                                        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png" alt="" />
                                    </a>
                                    <div className="login-signup">
                                        {state?.user?.name ? (
                                            <>
                                                <a style={{border:".2rem solid black"}} onClick={() => router('/register')} className="login-btn">{state?.user?.name}</a>
                                                <a onClick={LOGOUT} className="sign-up-btn">Logout</a>
                                            </>
                                        ) :
                                            (
                                                <>
                                                    <a onClick={() => router('/login')} className="login-btn">Login</a>
                                                    <a onClick={() => router('/register')} className="sign-up-btn">Sign up</a>
                                                </>
                                            )}
                                    </div>
                                </div>
                                <h1 className="que-linen">Hungry?</h1>
                                <h2 className="ans-line">Order food from favourite restaurants near you.</h2>
                                <div className="search-your-food">
                                    <input type="text" placeholder="Enter your delivery location" className="enter-delivery-location" />
                                    <button className="locate-me-btn">
                                        <span><i className="fa-solid fa-location-crosshairs"></i></span>
                                        <span className="locate-me">Locate Me</span>
                                    </button>
                                    <a onClick={() => router('/MultipleProduct')} className="find-food"><span>find food</span></a>
                                </div>
                                <div className="popular-cities">
                                    <p>Popular cities in India</p>
                                </div>
                                <ul className="cities">
                                    <li><a href="">Ahmedabad </a></li>
                                    <li><a href="">Bangalore </a></li>
                                    <li><a href="">Chennai </a></li>
                                    <li><a href="">Delhi </a></li>
                                    <li><a href="">Gurgaon </a></li>
                                    <li><a href="">Hyderabad </a></li>
                                    <li><a href="">Kolkata </a></li>
                                    <li><a href="">Mumbai </a></li>
                                    <li><a href="">Pune </a></li>
                                    <li><a href="">& More </a></li>
                                </ul>

                            </div>
                        </div>
                        <div className="right-side">
                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq" alt="" />
                        </div>
                    </div>

                    {/* <!-- section-2 --> */}

                    <div className="section-2">
                        <div className="services">
                            <div className="service-img">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_210,h_398/4x_-_No_min_order_x0bxuf" alt="" />
                            </div>
                            <h3>No Minimum Order</h3>
                            <p>Order in for yourself or for the group, with no restrictions on order value</p>
                        </div>
                        <div className="services">
                            <div className="service-img">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_224,h_412/4x_Live_order_zzotwy" alt="" />
                            </div>
                            <h3>Live Order Tracking</h3>
                            <p>Know where your order is at all times, from the restaurant to your doorstep</p>
                        </div>
                        <div className="services">
                            <div className="service-img">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_248,h_376/4x_-_Super_fast_delivery_awv7sn" alt="" />
                            </div>
                            <h3>Lightning-Fast Delivery</h3>
                            <p>Experience Swiggy's superfast delivery for food delivered fresh & on time</p>
                        </div>


                    </div>

                    {/* <!-- section-3 --> */}
                    <div className="section-3">
                        <div className="section-3-left">
                            <div className="d-heading">
                                Restaurants in your pocket
                            </div>
                            <div className="d-para">
                                Order from your favorite restaurants & track on the go, with the all-new Swiggy app.
                            </div>
                            <div className="download-opt">
                                <div className="playstore-img">
                                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/play_ip0jfp" alt="" />
                                </div>
                                <div className="appstore-img">
                                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/iOS_ajgrty" alt="" />
                                </div>
                            </div>
                        </div>


                        <div className="section-3-right">
                            <div className="app-demo-img-1">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/pixel_wbdy4n" alt="" />
                            </div>
                            <div className="app-demo-img2">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_768,h_978/iPhone_wgconp_j0d1fn" alt="" />
                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>



            </>

        </div>
    )
}

export default Home;