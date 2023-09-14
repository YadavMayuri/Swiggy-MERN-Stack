import { useNavigate, useParams } from "react-router-dom";
import { AuthProtected } from "./AuthProtected";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import Toast from "react-hot-toast"
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from '../Context/AuthContext';
import * as Icon from 'react-bootstrap-icons';
import PageLoader from "./PageLoader";

const SingleProduct = () => {
    const router = useNavigate()
    const { state, dispatch } = useContext(AuthContext)
    const { id } = useParams();
    const [product, setProduct] = useState()
    const [loading, setLoading] = useState(false);

    console.log(state?.cart?.totalProducts, "total cart prod from navbar");

    useEffect(() => {
        async function getSingleProduct() {
            setLoading(true)
            try {
                // console.log("inside try-----------------------------");
                const response = await axios.get(`http://localhost:3000/api/getSingleProduct/${id}`)
                if (response.data.success) {
                    setProduct(response.data.response)
                }
                else {
                    Toast.error(response.data.message)
                }

            } catch (err) {
                console.log(err);
                // if (err.response && err.response.data && err.response.data.message) {
                //     Toast.error(err.response.data.message);
                // } else {
                //     // Handle any other error cases
                //     console.log(err);
                //     Toast.error("An error occurred.");
                // }
            }
            finally {
                setLoading(false)
            }
        }
        getSingleProduct()
    }, [id])


    const addProduct = async () => {
        if (id && state?.user) {
            try {
                console.log(typeof (id), "state?.user?.id");
                const { data } = await axios.post("http://localhost:3000/api/buyer/addCart", { pId: id, userId: state?.user?.userId })
                console.log(data, "data");
                if (data.success) {
                    dispatch({
                        type: "AddToCart",
                        payload: data.cart,
                    })
                    Toast.success("Product added to cart!")
                } else {
                    Toast.error(data.error)
                }

            } catch (err) {
                console.log(err);
                Toast.error("Error while adding product to cart!")
            }
        } else {
            Toast.error("Internal server error!")
        }
    }



    return (
        <>
            <Navbar />

            {loading ? (
                <PageLoader />
            ) : (
                <AuthProtected>
                    <div className="commonScreen">
                        {product ? (
                            <div >

                                <div className="outer-container">
                                    <div className="sp-container">
                                        <div className="sp-section-1">
                                            <div className="sp-left-content">

                                                <div className="breadcrumbs">
                                                    <span><a href=""> Home</a></span>
                                                    <span>/</span>
                                                    <span><a href=""> Mumbai</a></span>
                                                    <span>/</span>
                                                    <span><a href=""> Vashi</a></span>
                                                    <span>/</span>
                                                    <span><a href="" className="sp-active"> {product.name}</a></span>
                                                </div>
                                            </div>
                                            <div className="sp-right-content">
                                                <div className="sp-search">
                                                    <button className="sp-dsearch-btn">
                                                        <i className="fa-solid fa-magnifying-glass"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- --------- section - 2 ----------- --> */}

                                        <div className="sp-section-2">
                                            <div className="sp-product-info-rating">
                                                <div className="sp-location-distance">
                                                    <p className="sp-product-heading" id="for-product-name"> </p>
                                                    <p className="sp-product-desc">{product.name}</p>
                                                    <div className="location-distance">
                                                        <p className="sp-exact-location">Vashi,</p>
                                                        <p className="sp-exact-distance">1.7 km</p>
                                                        <button className="sp-location-arrow"><i className="fa-solid fa-caret-down"></i></button>
                                                    </div>

                                                </div>
                                            </div>
                                            <ul className="sp-delivery-summery">
                                                <li>
                                                    <span><i className="fa-solid fa-person-biking"></i></span>
                                                    <span>1.7 kms | ₹0 Free Delivery </span>
                                                </li>
                                            </ul>
                                            <hr className="sp-hr-line" />

                                        </div>

                                        <div className="other-products">
                                            <h3 className="deal-of-day">
                                                <span>Rs {product.price} Deal Of The Day (18)</span>
                                            </h3>
                                            <span><i className="fa-solid fa-chevron-up"></i></span>
                                        </div>


                                        {/* <!-- best deals --> */}
                                        <div className="sp-deal-products">
                                            <div className="deal-info">
                                                <div className="sp-veg-icon">
                                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnA_HF3NAPvORJX0cxM5OWweLygJR9_sKpFg&usqp=CAU" alt="" />
                                                </div>
                                                <h4 className="deal-product-name">{product.name}</h4>
                                                <span className="strike-price">₹500</span>
                                                <span className="exact-price">₹{product.price}</span><br />
                                                <input type="button" value={"Add To Cart"} onClick={addProduct} className="AdCartISP" />
                                            </div>
                                            <div className="deal-img-add-btn">
                                                <div className="deal-img">
                                                    <div id="singleProduct"></div>
                                                    <img src={product.image} alt="" />
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="sp-hr-line-div" />

                                        <div className="sp-footer-info">
                                            <div className="sp-f-wrappwr">
                                                <div className="sp-f-img">
                                                    <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_120,h_60/fssai_final_edss9i" alt="" />
                                                </div>
                                                <div className="sp-l-no">
                                                    License No. 11518016000664
                                                </div>
                                            </div>

                                            <hr className="sp-hr-line-div" />

                                            <div className="sp-footer-product-name">
                                                <p className="ap-f-p-name">{product.name}</p>
                                                <p className="outlet-name">(Outlet:Vashi)</p>
                                                <p className="sp-address"><span className="sp-f-l-icon"><Icon.GeoAltFill style={{ fontSize: "2.2rem" }} /></span>UNIT NO- S-08, SECOND FLOOR, INORBIT
                                                    MALL VASHI, SECTOR- 30A, vashi Navi Mumbai - 400706</p>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <Footer />


                            </div>

                        ) : (
                            <div className="commonScreen" >
                                <div className="swmpNotfound">
                                    <div className="mlPnotfounD">
                                        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/empty_404_3x_rgdw87" alt="" />
                                    </div>
                                    <h1>Page not found</h1>
                                    <p>Uh-oh! Looks like the page you are trying to access, doesn't exist. Please start afresh.</p>
                                    <div>
                                        <input type="button" value={"Go Home"} className="swprodcommonBtn" onClick={() => router('/')} />
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </AuthProtected>
            )}





        </>

    )
}
export default SingleProduct;