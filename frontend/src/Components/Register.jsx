import React from "react";
import "../Css/style.css"
import "../Css/responsive.css"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {

    const { state } = useContext(AuthContext)

    const [userData, setuserData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'buyer' })
    const router = useNavigate()

    const handleChange = (event) => {
        setuserData({ ...userData, [event.target.name]: event.target.value })
    }
    const handleChangeForSelect = (event) => {
        // console.log(event.target.value, "- value", event.target.name, "- name")
        setuserData({ ...userData, ["role"]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("hiiiii");
        const { name, email, password, confirmPassword, role } = userData;
        console.log(name, email, password, confirmPassword, role, "userData");
        try {
            console.log('jjj');
            const response = await axios.post('https://swiggy-mern-stack-1.onrender.com/api/register', {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.confirmPassword,
                role: userData.role
            })
            console.log(response,'response');
            if (response.data.success) {
                setuserData({ name: '', email: '', password: '', confirmPassword: '', role: 'buyer' })
                router('/login')
                return Toast.success(response.data.success)
            } else {
                return Toast.error(response.data.message)
            }

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                return Toast.error(err.response.data.message);
            } else {
                return Toast.error("An error occurred. Please try again later.");
            }
        }
    }


    useEffect(() => {
        if (state?.user?.name) {
            Toast.success("You are already logged in.")
            router('/')
        }

    }, [state])

    return (

        <>
            <div id="l-screen">
                <div className="l-container">
                    <div className="l-right-side">
                        <div className="l-content-wrapper">
                            <div className="l-close-btn">
                                <a href=""> <i className="fa-solid fa-xmark"></i></a>
                            </div>
                            <div className="login-create-ac">
                                <div className="l-left-login">
                                    <h1 className="l-heading">Sign up</h1>
                                    <div className="l-create-ac">
                                        or
                                        <a onClick={() => router('/login')} className="l-create-ac-txt">login to your account</a>
                                    </div>
                                    <hr className="l-hr-line" />
                                </div>
                                <div className="l-right-img">
                                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                                </div>

                            </div>

                            <form onSubmit={handleSubmit} className="regFormWrap">
                                <div className="l-input-login">
                                    <input type="text" onChange={handleChange} name="name" required  style={{textTransform:"capitalize"}}/>
                                    <label>Name</label>
                                </div>
                                <div className="l-input-login">
                                    <input type="email" onChange={handleChange} name="email" required />
                                    <label >Email</label>
                                </div>
                                <div >
                                    <select onChange={handleChangeForSelect} className="l-input-login">
                                    <option value='' selected disabled>Select your role</option>
                                        <option value='buyer'>Buyer</option>
                                        <option value='seller'>Seller</option>
                                    </select>
                                </div>
                                <div className="l-input-login">
                                    <input type="password" onChange={handleChange} name="password" required />
                                    <label >Password</label>
                                </div>
                                <div className="l-input-login">
                                    <input type="password" onChange={handleChange} name="confirmPassword" required />
                                    <label>Confirm Password</label>
                                </div>
                                <button className="l-ref-txt">Have a referral code?</button>

                                <div className="l-login-btn">
                                    <input type="submit" value="sign Up" />
                                </div>

                                <div className="l-login-para">
                                    <p>By clicking on Login, I accept the <a href="">Terms & Conditions</a> &
                                        <a href="">Privacy
                                            Policy</a>
                                    </p>

                                </div>
                            </form>



                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register;