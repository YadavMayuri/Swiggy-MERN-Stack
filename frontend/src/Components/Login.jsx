import React from "react";
import "../Css/style.css";
import "../Css/responsive.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
    const [userData, setUserData] = useState({ email: "", password: "" });
    const router = useNavigate();
    const { dispatch, state } = useContext(AuthContext)
    console.log(state, "state from context into login component")

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { email, password } = userData;
        console.log(email,password,"emil,passwoed");

        try {
            console.log("in try login");
            const response = await axios.post('http://localhost:8000/api/login', {
                email: userData.email,
                password: userData.password,
            }
            );
            console.log(response,"resp from log front");
            if (response.data.success) {
                dispatch({
                    type: "LOGIN",
                    payload: response.data.user,

                })
                console.log(response.data.user, "user response from login payload");
                localStorage.setItem("SwiggyJwtToken", JSON.stringify(response.data.token))
                setUserData({ email: "", password: "" });
                if (response.data.user.role == 'seller') {
                    router('/sellerdashboard')
                } else {
                    router('/');

                }
                Toast.success(response.data.success);
            } else {
                Toast.error(response.data.message);
            }

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                Toast.error(err.response.data.message);
            } else {
                Toast.error("An error occurred. Please try again later.");
            }
        }
    };

    useEffect(() => {
        if (state?.user?.name) {
            Toast.success("You are already logged in.")
            router('/')

        }
    }, [state])

    return (
        <div>

            <div id="l-screen">
                <div className="l-container">
                    <div className="l-right-side">
                        <div className="l-content-wrapper">
                            <div className="l-close-btn">
                                <a href=""> <i className="fa-solid fa-xmark"></i></a>
                            </div>
                            <div className="login-create-ac">
                                <div className="l-left-login">
                                    <h1 className="l-heading">Login</h1>
                                    <div className="l-create-ac">
                                        or
                                        <a onClick={()=>router('/register')} className="l-create-ac-txt">Sign up to your account</a>
                                    </div>
                                    <hr className="l-hr-line" />
                                </div>
                                <div className="l-right-img">
                                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                                </div>

                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="l-input-login">
                                    <input type="email" onChange={handleChange} name="email" required />
                                    <label >Email</label>
                                </div>
                                <div className="l-input-login">
                                    <input type="password" onChange={handleChange} name="password" required />
                                    <label >Password</label>
                                </div>
                             
                                <button className="l-ref-txt">Have a referral code?</button>

                                <div className="l-login-btn">
                                    <input type="submit" value="Login" />
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

        </div>
    )
}

export default Login;