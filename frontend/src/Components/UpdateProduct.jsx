import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "./Navbar";

const UpdateProduct = () => {
    const { pId } = useParams()
    console.log(pId, "pid");
    const route = useNavigate();
    const [Loading, setLoading] = useState(false)
    const [productData, setProductData] = useState({ name: '', price: '', category: '', image: '' })

    useEffect(() => {
        const getUpdateProduct = async () => {
            setLoading(true)
            try {
                console.log(pId, "pppid");
                const response = await axios.get(`http://localhost:3000/api/seller/getUpdateProduct/${pId}`)
                console.log(response, "response from get update pro");
                if (response.data.success) {
                    setProductData(response.data.product)
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

        getUpdateProduct()
    }, [pId])

    const handleChange = (event) => {
        event.preventDefault();
        setProductData({ ...productData, [event.target.name]: event.target.value })
    };

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const { name, price, category, image } = productData
            console.log(name, price, category, image);

            console.log(productData, "pro data from handlesubmit");

            const response = await axios.put(`http://localhost:3000/api/seller/updateProduct/${pId}`, { productData })

            console.log(response, "response from put product");
            if (response.data.success) {
                setProductData(response.data.product)
                route('/sellerAllProducts')
                toast.success(response.data.message)
            } else {
                toast.error(response.data.message)
            }
        } catch (err) {
            console.log(err);
            toast.error("Internal server error!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>

          <Navbar/>
            {/* <SellerProtected> */}

            <div className="commonScreen">
                {Loading ? (
                    <div className="loader"></div>
                ) : (
                    <div style={{border:".1rem solid white"}}>
                <form onSubmit={handleSubmit} className="adpsw">
                    <h1 style={{ fontSize: "3rem", marginBottom: "1.6rem" }}>Add Product</h1>
                    <input type="text" name="name" onChange={handleChange} value={productData.name} /><br />
                    <input type="number" name="price" onChange={handleChange} value={productData.price}/><br />
                    <input type="text" name="category" onChange={handleChange} value={productData.category}/><br />
                    <input type="text" name="image" onChange={handleChange}  value={productData.image} /><br />
                    <input type="submit" style={{ marginTop: "20px", backgroundColor: "#fc8019", color: "white", outline: "none", border: "none",fontWeight:"600",borderRadius:".5rem",cursor:"pointer" }} />
                </form>
            </div>
                )}
            </div>
            {/* </SellerProtected> */}


        </div >
    );
}

export default UpdateProduct;
