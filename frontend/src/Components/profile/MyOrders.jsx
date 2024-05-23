import "../profile/allProfile.css"
import "../../Css/style.css";
import "../../Css/responsive.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import PageLoader from "../PageLoader";
import * as Icon from "react-bootstrap-icons";


const MyOrders = () => {
    const { state } = useContext(AuthContext)
    const [orderData, setOrderData] = useState([])
    const [loading, setLoading] = useState(false);
    const router = useNavigate()

    useEffect(() => {
        const getOrderHistory = async () => {
            setLoading(true)
            try {
                const response = await axios.post('https://swiggy-mern-stack.onrender.com/api/buyer/getOrderHistory', { userId: state?.user?.userId })
                console.log(response, "res from get history");
                if (response.data.success) {
                    setOrderData(response.data.orderHistory)
                } else {
                    toast.error(response.data.error)
                }


            } catch (err) {
                console.log(err);
                toast.error("Internal server error!")
            } finally {
                setLoading(false)
            }
        }
        if (state?.user) {
            getOrderHistory()
        }

    }, [state])
    return (
        <>
            {loading ? (
                <div className="commonScreen">
                    <PageLoader />
                </div>
            ) : (
                <>
                    {orderData?.length ? (
                        <>
                            <div className="myorderContainerinPr">
                                <h1>Past Orders</h1>

                                {orderData.map((orderHead) => (
                                    <div className="orderactualContentwrap">
                                        {orderHead.cartProduct.map((pro) => (
                                            <div className="oredrImgInfowrap" key={pro._id}>
                                                <div className="orderImagewrappwer">
                                                    <img src={pro.image} alt="" />
                                                </div>
                                                <div className="orderInfoNamePrice">
                                                    <p className="Oname">{pro.name}</p>
                                                    <p className="prorderId">Price : ₹{pro.price} </p>
                                                    <p className="prorderId">Order ID : {orderHead.orderDetails._id} </p>
                                                </div>
                                            </div>
                                        ))}
                                        <hr className="hrMyOrder" />
                                        <div className="bottomOrderContentWrapper">
                                            <div className="totalPriceDate">
                                                <span> Total Price :  ₹ {orderHead.orderDetails.totalPrice}</span>
                                                <span> delivered on  {orderHead.orderDetails.createdAt}  <span ><Icon.CheckCircleFill style={{ color: "#60b246", fontSize: "1.4rem" }} /></span></span>

                                            </div>
                                            <div className="OrdeBbuttonWrapper">
                                                <button className="orderBtn1">Reorder</button>
                                                <button className="helpBtn1">Help</button>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>


                        </>) : (
                        <>
                            <div className="NoorderyetWrapper">
                                <div className="noOrderContentWrap">
                                    <div className="noOrderimgwrapper">
                                        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_262/empty-orders-image_acrbbw" alt="" />
                                    </div>
                                    <h2>No Orders</h2>
                                    <p>You haven't placed any order yet.</p>
                                </div>
                            </div>
                        </>)}
                </>
            )}


        </>
    )
}

export default MyOrders;
