import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Css/style.css";
import "../Css/responsive.css";
import PageLoader from "./PageLoader";
import * as Icon from 'react-bootstrap-icons';



const MultipleProduct = () => {
    const router = useNavigate()
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getProducts() {
            setLoading(true)
            try {
                console.log("hii");

                // const response = await api.post("/getAllProducts")
                const response = await axios.get("http://localhost:3000/api/getAllProducts")
                console.log(response.data.products);
                if (response.data.success) {
                    setProducts(response.data.products)
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
    }, [])
    return (


        <>

            <Navbar />
            {loading ? (
                <div className="screen">
                    <PageLoader />
                </div>
            ) : (
                <div className="screen">
                    {products?.length ?
                        <div>
                            <div className="p-slider">
                                <div className="slider-img">
                                    <a href="">
                                        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/345b2c3e5d0064046c07b0fe01de8e66" alt="" />
                                    </a>
                                </div>
                                <div className="slider-img">
                                    <a href="">
                                        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/e0b0a61e42290317661f60a4e6ee537f" alt="" />
                                    </a>
                                </div>
                                <div className="slider-img">
                                    <a href="">
                                        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/41a490530291679aea026a336d51dab6" alt="" />
                                    </a>
                                </div>
                                <div className="slider-img">
                                    <a href="">
                                        <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/rng/md/carousel/production/6fa476c6612acbab5e2ccac960b465e2" alt="" />
                                    </a>
                                </div>

                            </div>

                            {/* <!-- second navbar------------ --> */}
                            <div className="filter-content-wrapper">

                                <div className="left-filter-content">
                                    <h2>930 restaurants</h2>
                                </div>
                                <div className="right-filter-content">
                                    <div className="right-filter-menu active-filter-menu">Relevance</div>
                                    <div className="right-filter-menu">Delivery Time </div>
                                    <div className="right-filter-menu">Rating </div>
                                    <div className="right-filter-menu">Cost: Low to High </div>
                                    <div className="right-filter-menu">Cost: High to Low </div>
                                    <div className="right-filter-menu">
                                        <span className="filter-txt"> Filters</span>
                                        <span className="p-filter-icon"><Icon.ArrowDownUp /></span>
                                    </div>


                                </div>
                            </div>


                            {/* <!-- --products-- --> */}
                            {/* 
                            <!-- <div className="product-content-wrapper">
                                <div id="products"></div>

                            </div> --> */}
                            <div className="product-content-wrapper" id="finalswiggyproducts">
                                {products.map((product) => (
                                    <div className="product-dish" key={product._id} onClick={() => router(`/singleProduct/${product._id}`)}>

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

                        </div>
                        :

                        <div >
                            <div className="swmpNotfound">
                                <div className="mlPnotfounD">
                                    <img src="https://stores.maxfashion.in/VendorpageTheme/Enterprise/EThemeForMax/images/product-not-found.jpg" alt="" />
                                </div>
                                <div>
                                    <input type="button" value={"Back"} className="swprodcommonBtn" onClick={() => router('/')} />
                                </div>

                            </div>
                        </div>
                    }


                </div>
            )}


            <Footer />

        </>

    )
}

export default MultipleProduct;