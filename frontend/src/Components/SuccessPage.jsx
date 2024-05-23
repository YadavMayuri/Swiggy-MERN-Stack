import "../Css/style.css";
import "../Css/responsive.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


const SuccessPage = () => {
    const router = useNavigate()
    const { state } = useContext(AuthContext)

    return (
        <div>
            <Navbar />
            <div className="commonScreen">
                <div className="mainDivBackground">
                    <div className="successContentWrap">
                        <div className="simaegsWrapper">
                            <img src="https://thebusinessrule.com/wp-content/uploads/2023/01/Swiggy-Business-Model-Delivery-Boy.jpeg" alt="" />
                        </div>
                        <p className="ThanksMsg" >Order has been placed successfully!</p>
                        <p className="shippingContent">It will be  delivered in 45 mins.</p>
                        <div>
                            <input type="button" value={"BUY MORE"} className="swprodcommonBtn" onClick={() => router('/')} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SuccessPage;