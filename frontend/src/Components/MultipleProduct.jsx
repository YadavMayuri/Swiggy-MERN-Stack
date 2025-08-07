import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Css/style.css";
import "../Css/responsive.css";
import PageLoader from "./PageLoader";
import * as Icon from 'react-bootstrap-icons';
import All1 from "../Images/All1.png"
import { AuthContext } from "../Context/AuthContext";

const MultipleProduct = () => {
    const router = useNavigate()
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(false);

    const { state } = useContext(AuthContext)

    const [selectedCategory, setSelectedCategory] = useState("All"); // Step 1: Initialize selectedCategory with "All"

    useEffect(() => {
        async function getProducts() {
            setLoading(true)
            try {
                console.log("hii");

                // const response = await api.post("/getAllProducts")
                const response = await axios.get("https://swiggy-mern-stack-1.onrender.com/api/getAllProducts")
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


    async function getAllProducts() {
        try {
            const response = await axios.get("https://swiggy-mern-stack-1.onrender.com/api/getAllProducts");
            if (response.data.success) {
                setProducts(response.data.products);
                console.log(response.data.products,"all products");
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.error("Error fetching all products:", err);
            toast.error("An error occurred");
        }
    }


    async function getByCategory(category) {
        try {
            console.log("in grtcat");
            const response = await axios.get('https://swiggy-mern-stack-1.onrender.com/api/getByCategory', {
                params: { category } // Pass the category as a query parameter
            });

            console.log(response.data, "ref from getcat");
            if (response.data.success) {
                setProducts(response.data.products);
                console.log(`Products for category ${category}:`, response.data.products);
            } else {
                toast.error(response.data.message);
                console.error(`Error for category ${category}:`, response.data.message);
            }
        } catch (err) {
            // Handle any network or other errors for each category
            console.error(`Error for category ${category}:`, err);
            toast.error("An error occurred");
        }
    }

      // Update selectedCategory when a category is clicked
      const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        console.log("Selected category:", category);
        if (category === "All") {
            getAllProducts();
        } else {
            getByCategory(category);
        }
    };


    return (


        <>

            <Navbar />
            {loading ? (
                <div className="commonScreen">
                    <PageLoader />
                </div>
            ) : (
                <div className="commonScreen">
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

                            <p className="dstatemuserName">{state?.user ? (<>{state?.user?.name}, what's on your mind?
                            </>) : (<> </>)}</p>



                            <div style={{ position: "sticky", zIndex: "1000", backgroundColor: "white", top: "0", height: "100%" }}>
                                <div >

                                    <div className="gcategorywrapper" >
                                        <div className="getSinglecategory" onClick={() => handleCategoryClick("All")}>
                                            <img src={All1} alt="" style={{ height: "94%", paddingTop: "1.6rem" }} />
                                        </div>
                                        <div className="getSinglecategory" onClick={() => handleCategoryClick('Burger')}>
                                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png" alt="" />
                                        </div>
                                        <div className="getSinglecategory" onClick={() => handleCategoryClick('Pizza')}>
                                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png" alt="" />
                                        </div>
                                        <div className="getSinglecategory" onClick={() => handleCategoryClick('Sandwich')}>
                                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029860/PC_Creative%20refresh/3D_bau/banners_new/Sandwich.png" alt="" />
                                        </div>
                                        <div className="getSinglecategory" onClick={() => handleCategoryClick('Dosa')}>
                                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029850/PC_Creative%20refresh/3D_bau/banners_new/Dosa.png" alt="" />
                                        </div>
                                        <div className="getSinglecategory" onClick={() => handleCategoryClick('Pav Bhaji')}>
                                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029854/PC_Creative%20refresh/3D_bau/banners_new/Pav_Bhaji.png" alt="" />
                                        </div>
                                        <div className="getSinglecategory" onClick={() => getByCategory('Cakes')}>
                                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Cakes.png" alt="" />
                                        </div>


                                    </div>
                                </div>


                                {/* <!-- second navbar------------ --> */}
                                <div className="filter-content-wrapper">

                                    <div className="left-filter-content">
                                        <h2>Restaurants to explore {selectedCategory}</h2>
                                    </div>
                                    {/* <div className="right-filter-content">
                                        <div className="right-filter-menu active-filter-menu">Relevance</div>
                                        <div className="right-filter-menu">Delivery Time </div>
                                        <div className="right-filter-menu">Rating </div>
                                        <div className="right-filter-menu">Cost: Low to High </div>
                                        <div className="right-filter-menu">Cost: High to Low </div>
                                        <div className="right-filter-menu">
                                            <span className="filter-txt"> Filters</span>
                                            <span className="p-filter-icon"><Icon.ArrowDownUp /></span>
                                        </div>


                                    </div> */}
                                </div>

                            </div>




                            <div className="product-content-wrapper" id="finalswiggyproducts">
                                {products.map((product) => (

                                    <div className="product-dish" key={product._id} onClick={() => router(`/singleProduct/${product._id}`)}>

                                        <div className="product-image" id="product-img">
                                            <div className="ribbon-pop">PROMOTED</div>
                                            <img src={product.image} alt="" />

                                        </div>
                                        <div className="product-maker-info">
                                            <div className="product-maker-name" id="for-product-name">{product.name} </div>
                                            <span style={{ width: "10" }}><Icon.Heart style={{ fontSize: "1.4rem", }} /></span>
                                        </div>
                                        <div className="product-maker-location">{product.category}</div>
                                        <div className="rating-price-info">
                                            <div className="rating">
                                                <span className="rating-icon"><Icon.StarFill style={{ fontSize: "1rem" }} /></span>
                                                <span className="rating-count">3.8</span>
                                            </div>
                                            {/* <div className="dot-icon">.</div> */}
                                            <div className="delivery-time">19 mins</div>
                                            {/* <div className="dot-icon">.</div> */}
                                            <div className="delivery-qty-count" id="for-product-price">₹{product.price} FOR TWO</div>
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