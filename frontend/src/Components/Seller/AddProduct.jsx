import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Navbar from "../Navbar";
import "../../Css/style.css";
import "../../Css/responsive.css";
import { SellerProtected } from "../AuthProtected/index";
import { useContext } from "react";
import { AuthContext } from '../../Context/AuthContext';


const AddProduct = () => {

    const { state } = useContext(AuthContext)

    const [productData, setProductData] = useState({ name: "", price: "", image: "", category: "" })
    const router = useNavigate();

    const handleChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("handlesub");

        const { name, price, image, category } = productData;
        console.log(name, price, image, category);
        console.log(productData, "productData");
        try {
            console.log("inside try");

            const response = await axios.post("https://swiggy-mern-stack.onrender.com/api/seller/addProduct", { productData, userId: state?.user?.userId })

            console.log(response, "resss");
            if (response.data.success) {
                setProductData({ name: '', price: '', image: '', category: '' })
                toast.success(response.data.message)
            }
            else {
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
    }

    return (

        <div className="commonScreen">
            <Navbar />
            <SellerProtected>
            <div style={{border:".1rem solid white"}}>
                <form onSubmit={handleSubmit} className="adpsw">
                    <h1 style={{ fontSize: "3rem", marginBottom: "1.6rem" }}>Add Product</h1>
                    <input type="text" name="name" onChange={handleChange} placeholder="Product Name" /><br />
                    <input type="number" name="price" onChange={handleChange} placeholder="Product Price" /><br />
                    <input type="text" name="category" onChange={handleChange} placeholder="Product Category" /><br />
                    <input type="text" name="image" onChange={handleChange} placeholder="Product Image URL" /><br />
                    <input type="submit" style={{ marginTop: "20px", backgroundColor: "#fc8019", color: "white", outline: "none", border: "none",fontWeight:"600",borderRadius:".5rem",cursor:"pointer" }} />
                </form>
            </div>

            </SellerProtected>

        </div>
    )
}

export default AddProduct;