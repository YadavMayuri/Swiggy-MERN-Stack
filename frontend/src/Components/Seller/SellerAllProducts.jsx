import Navbar from "../Navbar";
import "../../Css/style.css";
import "../../Css/responsive.css";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PageLoader from "../PageLoader";
import { useContext } from "react";
import { AuthContext } from '../../Context/AuthContext';
import { SellerProtected } from "../AuthProtected/index";
import * as Icon from 'react-bootstrap-icons';


const SellerAllProducts = () => {
    const router = useNavigate()
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(false);
    const { state } = useContext(AuthContext)


    useEffect(() => {
        async function getProducts() {
            setLoading(true)
            try {
                console.log("hii");

                // const response = await api.post("/getAllProducts")
                const response = await axios.post("http://localhost:3000/api/seller/sellerAllProducts", { sellerId: state?.user?.userId })
                console.log(response.data.products);
                if (response.data.success) {
                    setProducts(response.data.sProducts)
                } else {
                    toast.error(response.data.message)
                }

            } catch (err) {
                console.log(err);
                if (err.response && err.response.data && err.response.data.message) {
                    toast.error(err.response.data.message);
                } else {
                    // Handle any other error cases
                    toast.error("An error occurred.");
                }
            }
            finally {
                setLoading(false)
            }
        }
        getProducts()
    }, [state])

    return (
        <>
            <Navbar />
            <div>
                {loading ? (
                    <div className="commonScreen">
                        <PageLoader />
                    </div>
                ) : (
                    <>
                        {/* <SellerProtected> */}
                        <div className="commonScreen">
                            {products?.length ?
                                <div style={{ width: "90%", margin: "auto" }}>
                                    <div className="path">
                                        <div className="path-menu" style={{ fontSize: "2rem", padding: "3rem 0 0 0",fontWeight:"bold" }}>Your Products</div>
                                    </div>
                                    <div className="products-container" >
                                        {products.map((product) => (
                                            <div className="product-dish" key={product._id}>
                                                <div className="product-image" id="product-img">
                                                    <img src={product.image} alt="" />
                                                </div>
                                                <div className="product-maker-info">
                                                    <div className="product-maker-name" id="for-product-name">{product.name} </div>
                                                    {/* <div className="product-maker-location">Chinese, Indian</div> */}
                                                </div>
                                                <div className="rating-price-info">
                                                    <div className="rating">
                                                        <span className="rating-icon"><Icon.StarFill style={{ fontSize: "1rem" }} /></span>
                                                        <span className="rating-count">3.8</span>
                                                    </div>
                                                    {/* <div className="dot-icon">.</div> */}
                                                    <div className="delivery-time">19 mins</div>
                                                    {/* <div className="dot-icon">.</div> */}
                                                    <div className="delivery-qty-count" id="for-product-price">{product.price} FOR TWO</div>
                                                </div>
                                                <hr className="h-line" />
                                                <div className="discount-offer-info">
                                                    <span className="discount-icon"><Icon.Percent style={{ fontSize: "1rem" }} /></span>
                                                    <span className="discount-number">40% off | Use TRYNEW</span>
                                                </div>
                                                {/* <hr className="h-line" /> */}

                                            </div>
                                        ))}

                                    </div>
                                </div> :

                                <div >
                                    <div className="commonScreen">
                                        <div style={{ border: ".1rem solid white" }}>
                                            <div className="mlPnotfounD" style={{width:"25%",margin:"2rem auto",}}>
                                                <img src="https://stores.maxfashion.in/VendorpageTheme/Enterprise/EThemeForMax/images/product-not-found.jpg" alt="" />
                                            </div>
                                            <div>
                                                <input type="button" style={{ margin: "0 auto" }} value={"Back"} className="swprodcommonBtn" onClick={() => router('/sellerdashboard')} />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            }


                        </div>
                        {/* </SellerProtected> */}
                    </>

                )}

            </div>

        </>
    )
}

export default SellerAllProducts;