import Navbar from "./Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthProtected } from "./AuthProtected";
import "../Css/accordianOrderHistory.css";
import "../Css/style.css";
import "../Css/responsive.css";



const OrderHistory = () => {
    const { state } = useContext(AuthContext)
    const [orderData, setOrderData] = useState([])
    const [loading, setLoading] = useState(false);
    const router = useNavigate()

    useEffect(() => {
        const getOrderHistory = async () => {
            setLoading(true)
            try {
                const response = await axios.post('https://swiggy-mern-stack-1.onrender.com/api/buyer/getOrderHistory', { userId: state?.user?.userId })
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
        <div>
            <Navbar />
            {loading ? (
                <div className="screen">
                    <div className="loader"></div>
                </div>
            ) : (
                <AuthProtected>
                    <div>
                        {orderData?.length ? (
                            <div className="commonScreen">
                                <div className="container" style={{ width: "90%", margin: " 0 auto 5rem auto" }}>
                                    <h1 style={{ margin: "2rem 0", color: "#832729" }}>Order History</h1>

                                    {orderData.map((orderHead) => (
                                        <details>
                                            <summary>

                                                <div><b> Order Id :</b> {orderHead.orderDetails._id}</div>
                                                <div ><b>Order Date :</b> {orderHead.orderDetails.createdAt}</div>


                                            </summary>
                                            <div>
                                                {orderHead.cartProduct.map((pro) => (
                                                    <div>
                                                        <div className="cart-products" key={pro._id} style={{ display: "flex", justifyContent: "start", gap: "2rem", padding: "0", borderBottom: ".1rem solid lightgray" }}>
                                                            <div className="cart-product-img" style={{ width: "13%" }} id="productImage">
                                                                <img src={pro.image} className="got-image" alt="" />
                                                            </div>
                                                            <div className="cartproductdetails">
                                                                <div className="cart-product-name" id="productName">{pro.name}</div>
                                                                <div className="cart-product-id">{pro._id}</div>
                                                                <div className="cart-price-section">
                                                                    <div className="c-real-price" style={{ color: "gray" }} id="productPrice">₹ {pro.price} </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div>
                                                    <div style={{ display: "flex", padding: "1rem 0", fontSize: "1.8rem" }}>
                                                        <h5 className="c-real-price">Total Price : <span style={{ fontWeight: "normal" }}>{orderHead.orderDetails.totalPrice}</span></h5>
                                                        <h5 className="c-real-price" style={{ paddingLeft: "3rem" }}>Total Products : <span style={{ fontWeight: "normal" }}>{orderHead.orderDetails.totalProduct}</span></h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </details>
                                    ))}


                                </div>
                            </div>
                        ) : (

                            <div className="commonScreen">
                                <div className="emmaindiv" style={{ width: "30%", margin: " auto" }}>
                                    <div className="emptycartImage" style={{ width: "60%",margin:"auto" }}>
                                        <img src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwd15e3cb8/images/no-order.svg" alt="" />
                                    </div>
                                    <p className="cemtxt" >No Order Details Yet ! </p>
                                    <input type="button" value={"Continue Shopping"} style={{ padding: "1rem 3rem",display:"block",margin:"3rem auto",cursor:"pointer",backgroundColor:"orange",color:"white",border:"none",outline:"none",fontWeight:"700" }} className="conShoppingbtn" onClick={() => router('/')} />
                                </div>
                            </div>
                        )}
                    </div>
                </AuthProtected>
            )}
        </div>
    );
}

export default OrderHistory;