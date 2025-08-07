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
                                        <img src="data:image/png;base64,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" alt="" />
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