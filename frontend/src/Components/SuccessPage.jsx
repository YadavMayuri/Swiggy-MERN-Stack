import "../Css/style.css";
import "../Css/responsive.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useContext} from "react";
import { AuthContext } from "../Context/AuthContext";


const SuccessPage = () => {
    const router = useNavigate()
    const { state } = useContext(AuthContext)

    return (
        <div>
            <Navbar/>
            <div className="screen">
                <div className="mainDivBackground">
                    <div className="successContentWrap">
                        <p className="orderCon">Your order has been placed successfully!</p>
                        <p className="ConfEmail">Confirmation will be sent to your email.</p>
                        <p className="shippingContent">Shipping to <span id="CurrentuserName">{state?.user?.name}</span> vashi, Mumbai,Maharashtra, 402107, India.</p>
                        <p className="ThanksMsg" style={{fontSize:"2.5rem",margin:"2.5rem 0"}}>Thank you for shopping with us!</p>
                        <input type="button" value={"Continue Shopping"} className="conShoppingbtn" onClick={() => router('/')} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SuccessPage;