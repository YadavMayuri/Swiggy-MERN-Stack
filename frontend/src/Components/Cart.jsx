import "../Css/style.css";
import "../Css/responsive.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Navbar from "./Navbar";
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import PageLoader from "./PageLoader";
import { AuthProtected } from "./AuthProtected";


const Cart = () => {
    const router = useNavigate()

    const { state, dispatch } = useContext(AuthContext)

    const [cartProduct, setCartProduct] = useState([])
    const [totalPrice, setTotalprice] = useState(0)
    const [totalProduct, setTotalProduct] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const getCartProduct = async () => {
            setLoading(true)
            try {
                console.log("inside try get pro - frontend");
                const response = await axios.post("https://swiggy-mern-stack.onrender.com/api/buyer/getCartProducts", { userId: state?.user?.userId })
                console.log(response.data, "inside try get pro - frontend");

                if (response.data.success) {
                    setCartProduct(response.data.cartProducts)
                    setTotalprice(response.data.totalPrice)
                    setTotalProduct(response.data.totalProducts)
                    setSubTotal(response.data.subTotal)
                    console.log(response.data.cartProducts);
                    console.log(response.data.totalProducts,"response - tot pro from get pro controller");
                } else {
                    return toast.error(response.data.message)
                }

            } catch (err) {
                console.log(err);
            }
            finally {
                setLoading(false)
            }

        }
        getCartProduct();
    }, [state])


    async function removeProductfromCart(pId) {
        setLoading(true)
        try {
            const response = await axios.post("https://swiggy-mern-stack.onrender.com/api/buyer/removeproduct", { pId, userId: state?.user?.userId })
            if (response.data.success) {
                dispatch({
                    type: "RemoveSingleProduct",
                    payload: response.data.cart
                })
                setCartProduct(response.data.cartProducts)
                setSubTotal(response.data.subTotal)
                setTotalProduct(response.data.totalProducts)
                setTotalprice(response.data.totalPrice)
                toast.success(response.data.message)
                console.log(response.data.totalProducts,"response - tot pro from remove pro controller");
            }
            else {
                return toast.error(response.data.message)
            }
        } catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }

    }


    const buyNow = async () => {
        try {
            console.log(cartProduct, totalPrice, totalProduct, "cart,totalPrice, totalProducts from buynow");
            const response = await axios.post('https://swiggy-mern-stack.onrender.com/api/buyer/buyNow', { userId: state?.user?.userId, cartProduct, totalPrice, totalProduct })
            console.log(response, "res from buy now");
            if (response.data.success) {
                dispatch({
                    type: "EmptyCart",
                    payload: response.data.cart
                })
                setCartProduct(response.data.finalCart)
                console.log(response.data.finalCart,"response.data.finalCart--- buy now");
                toast.success("Order placed successfully!");
            } else {
                toast.error("Error while processing transaction!")
            }
        } catch (err) {
            console.log(err);
            toast.error("Internal server error!")
        }
    }

    const handleBuyNow = () => {
        buyNow();
        router('/successpage');
    }
    return (
        <>
            <Navbar />
            {loading ? (
                <div className="commonScreen">
                    <PageLoader />
                </div>
            ) : (
                <AuthProtected>
                    <div className="commonScreen">
                        {cartProduct?.length ?
                            <div>
                                <div className="cart-container">
                                    <div className="cart-left-side">
                                        <div className="c-left-top-div">
                                            <div className="c-cart-txt">
                                                <div className="c-d-cart-head">
                                                    Logged in
                                                </div>
                                                <div className="c-d-icon">
                                                    <Icon.CheckCircleFill style={{ fontSize: "2rem", color: "#60b246" }} />
                                                </div>
                                            </div>
                                            <div className="c-work-heading" style={{fontWeight:"500",marginBottom:"2rem",display:"flex",justifyContent:"start",gap:"2rem",paddingTop:"1rem",paddingBottom:"1rem",}}>
                                              <span>{state?.user?.name} </span>    |  <span style={{textTransform:"lowercase"}}>{state?.user?.email}</span> 
                                            </div>
                                            <div className="c-deliver-add-heading">
                                                <div className="c-cart-txt">
                                                    <div className="c-d-cart-head">
                                                        Delivery Adddress
                                                    </div>
                                                    <div className="c-d-icon">
                                                        <Icon.CheckCircleFill style={{ fontSize: "2rem", color: "#60b246" }} />
                                                    </div>
                                                </div>
                                                <div className="c-change-opt">
                                                    change
                                                </div>

                                            </div>

                                            <div className="work">
                                                <div className="c-work-heading">
                                                    work
                                                </div>
                                                <div className="c-work-address">
                                                    4, 3XFX+Q4V, Juhu Nagar, Sector 2, Vashi, Navi Mumbai, Maharashtra 400703, India
                                                </div>
                                                <div className="c-time">
                                                    40 mins
                                                </div>
                                            </div>

                                        </div>
                                        <div className="c-left-bottom-div">
                                            <div className="c-d-cart-head">
                                                Choose payment method
                                            </div>
                                            <div className="cart-payment-opt">
                                                <div className="payment-option-names">
                                                    <div className="payment-opt-name cart-active-mode">
                                                        <div className="payment-opt-icon">
                                                            <i className="fa-solid fa-wallet"></i>
                                                        </div>
                                                        <div className="payment-opt-mode">
                                                            Wallets
                                                        </div>
                                                    </div>
                                                    <div className="payment-opt-name">
                                                        <div className="payment-opt-icon">
                                                            <i className="fa-solid fa-money-check"></i>
                                                        </div>
                                                        <div className="payment-opt-mode">
                                                            UPI
                                                        </div>
                                                        <div className="cart-new-btn">
                                                            {/* <img src="./images/new-img.png" alt=""/> */}
                                                        </div>
                                                    </div>
                                                    <div className="payment-opt-name">
                                                        <div className="payment-opt-icon">
                                                            <i className="fa-solid fa-credit-card"></i>
                                                        </div>
                                                        <div className="payment-opt-mode">
                                                            Sodexo
                                                        </div>
                                                    </div>
                                                    <div className="payment-opt-name">
                                                        <div className="payment-opt-icon">
                                                            <i className="fa-solid fa-building-columns"></i>
                                                        </div>
                                                        <div className="payment-opt-mode">
                                                            Netbanking
                                                        </div>
                                                    </div>
                                                    <div className="payment-opt-name">
                                                        <div className="payment-opt-icon">
                                                            <i className="fa-solid fa-credit-card"></i>
                                                        </div>
                                                        <div className="payment-opt-mode">
                                                            Credit & Debit cards
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="payment-opt-info">
                                                    <div className="payment-opt-desc">
                                                        <div className="payment-opt-img">
                                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWRDp0QEN6mnZNNs7WPOgnDOIHI_kEJP3UXuvo7cE5zhhmTJL-uC5ehFbGBkDUk_F88jI&usqp=CAU" alt="" />
                                                        </div>
                                                        <div className="payment-name-txt">
                                                            Amazon Pay
                                                        </div>
                                                        <div className="cart-payment-btn" id="Payrupees"
                                                            onClick={handleBuyNow}>
                                                           Pay ₹{totalPrice}
                                                        </div>

                                                    </div>
                                                    <div className="payment-opt-desc">
                                                        <div className="payment-opt-img">
                                                            <img src="https://1000logos.net/wp-content/uploads/2021/03/Paytm_Logo.jpg" alt="" />
                                                        </div>
                                                        <div className="payment-name-txt">
                                                            Paytm
                                                        </div>
                                                        <div className="cart-payment-link">
                                                            link account
                                                        </div>

                                                    </div>
                                                    <div className="payment-opt-desc">
                                                        <div className="payment-opt-img">
                                                            <img src="data:image/jpeg;base64,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" alt="" />
                                                        </div>
                                                        <div className="payment-name-txt">
                                                            PhonePe (Wallet/UPI/Cards)
                                                        </div>
                                                        <div className="cart-payment-link">
                                                            link account
                                                        </div>

                                                    </div>
                                                    <div className="payment-opt-desc">
                                                        <div className="payment-opt-img">
                                                            <img src="data:image/png;base64,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" alt="" />
                                                        </div>
                                                        <div className="payment-name-txt">
                                                            MobiKwik
                                                        </div>
                                                        <div className="cart-payment-link">
                                                            link account
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="cart-right-side">
                                        <div className="cart-right-top-div">
                                            <div className="cart-products-adding-wrap" id="finalcart">
                                                {cartProduct.map((pro) => (
                                                    <div   key={pro._id}>
                                                        <div className="cart-product-summery" >
                                                            <div className="cart-product-s-img" id="product-img">
                                                                <img src={pro.image} alt="" />
                                                            </div>
                                                            <div className="cart-product-name-place">
                                                                <p className="c-product-name" id="product-name">{pro.name} </p>
                                                                <p className="c-product-place">Vashi</p>
                                                                <div className="c-underline"></div>
                                                            </div>
                                                        </div>

                                                        <div className="product-add-remove-options">
                                                            <div className="cart-veg-icon">
                                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnA_HF3NAPvORJX0cxM5OWweLygJR9_sKpFg&usqp=CAU" alt="" />
                                                            </div>
                                                            <div className="product-veg-category" id="product-name">
                                                                {pro.name}
                                                            </div>
                                                            <div className="add-remove-btns">
                                                                <span className="remove-cart-btn" onClick={()=>removeProductfromCart(pro._id)}>-</span>
                                                                <span>1</span>
                                                                <span className="add-cart-btn">+</span>
                                                            </div>
                                                            <div className="cart-a-r-price" id="product-price">
                                                                ₹{pro.price}
                                                            </div>
                                                        </div>
                                                    </div>

                                                ))}

                                            </div>


                                            <div className="suggestion-content">
                                                <h1>&ldquo;</h1>
                                                <input type="text" placeholder="Any suggestions? We will pass it on..." />
                                            </div>

                                            <div className="notice-delivery-opt">
                                                <div className="checkbox-icon">
                                                    <input type="checkbox" />
                                                </div>
                                                <div className="cart-d-notice">
                                                    <p>Opt in for No-contact Delivery</p>
                                                    <p>Unwell, or avoiding contact? Please select no-contact delivery. Partner will safely place
                                                        the
                                                        order outside your door (not for COD)</p>
                                                </div>


                                            </div>
                                            <div className="cart-coupon">
                                                <div className="c-coupon-icon">
                                                    <Icon.PlusCircleDotted style={{ fontSize: "1.7rem" }} />
                                                </div>
                                                <div className="c-coupon-txt">
                                                    Apply coupon
                                                </div>
                                            </div>

                                            <div className="cart-bill">
                                                <h4 className="bill-heading">Bill Details</h4>
                                                <div className="cart-bill-info">
                                                    <div className="bill-desc">
                                                        Item Total
                                                    </div>
                                                    <div className="bill-amount" id="BillAmt">
                                                        {totalProduct}
                                                    </div>
                                                </div>
                                                <div className="cart-bill-info">
                                                    <div className="bill-desc">
                                                        Delivery Fee | 0.6 kms
                                                    </div>
                                                    <div className="bill-amount">
                                                        Free
                                                    </div>
                                                </div>
                                                <div className="cart-bill-border"></div>
                                                <div className="cart-bill-info">
                                                    <div className="bill-total-price-txt">
                                                        TO PAY
                                                    </div>
                                                    <div className="bill-total-amount" id="BillTotalAmt">
                                                        {totalPrice}
                                                    </div>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="cart-right-bottom-div">
                                            <div className="order-cancellation-detail">
                                                <h3>Review your order and address details to avoid cancellations</h3>
                                                <p><span>Note:</span>If you cancel within 60 seconds of placing your order, a 100% refund will
                                                    be issued. No refund for cancellations made after 60 seconds.</p>
                                                <p>Avoid cancellation as it leads to food wastage.</p>
                                                <h5>Read cancellation policy</h5>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div> :
                            
                            <div className="commonScreen">

                                <div style={{ width: "30%", margin: " auto" }}>
                                    <div className="emptycartImage">
                                        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" />
                                    </div>
                                    <p className="cemtxt">Your cart is empty </p>
                                    <p className="cemsubtxt">You can go to home page to view more restaurants</p>
                                    <input type="button" value={"See Restaurants near you"} className="swprodcommonBtn" onClick={() => router('/')} />
                                </div>

                            </div>}
                    </div>

                </AuthProtected>

            )}


        </>
    )
}
export default Cart;