import Products from "../modals/productModal.js";
import Users from "../modals/userModal.js"

export const addProduct = async (req, res) => {
    try {
        const { name, price, image, category } = req.body.productData;
        const { userId } = req.body;
        console.log(req.body, "p data controller")
        if (!name) return res.status(400).json({ message: "Name is required!" })
        if (!price) return res.status(400).json({ message: "Price is required!" })
        if (!image) return res.status(400).json({ message: "Image is required!" })
        if (!category) return res.status(400).json({ message: "Category is required!" })
        if (!userId) return res.status(400).json({ message: "User ID is required!" })

        const user = await Users.findById({ _id: userId })
        if (!user) return res.status(404).json({ message: "User not found!" })

        if (user.role !== 'seller') return res.status(403).json({ success: false, message: "Only seller can add Products!" })

        const existingProduct = await Products.findOne({ name, sellerId: userId }).exec()
        console.log(existingProduct, "existing pro");
        if (existingProduct) return res.status(400).json({ success: false, message: "Product already exist!" })

        const product = new Products({
            name, price, image, category, sellerId: user._id
        })
        await product.save();
        console.log(product, "product here");
        return res.status(201).json({ success: true, message: "Product added successfully.", product });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
}


export const getAllProducts = async (req, res) => {
    try {
        console.log("inside get product cont");
        const resposne = await Products.find({}).exec();
        console.log(resposne, "response here");
        if (resposne) {
            console.log("inn");
            console.log(resposne, "res");
            return res.status(200).json({ success: true, products: resposne });
        } else {
            return res.status(404).json({ success: false, message: "No Products Found!" });
        }
    } catch (error) {
        console.log(error, "errror here.............");
        return res.status(500).json({ success: false, message: error });
    }
}


export const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Products.findById({ _id: id }).exec();
        console.log(response, "response here----------");
        if (response) {
            return res.status(200).json({ success: true, response })
        } else {
            return res.status(404).json({ message: "Products not found." })
        }
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}


//seller  get  all products
export const sellerAllProducts = async (req, res) => {
    try {
        const { sellerId } = req.body;
        console.log(sellerId, "userid--");
        if (!sellerId) return res.status(400).json({ message: "User ID is required!" })

        const user = await Users.findById({ _id: sellerId }).exec()
        if (!user) return res.status(404).json({ message: "User not found!" })

        const sProducts = await Products.find({ sellerId: sellerId }).exec()
        console.log(sProducts, "prooooooo");
        if (!sProducts) return res.status(404).json({ message: "No products found!" })

        return res.status(200).json({ success: true, sProducts })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error!" })
    }

}




export const getUpdateProduct = async (req, res) => {
    try {
        const { pId } = req.params;
        console.log(pId, "pid");
        if (!pId) return res.json({ error: "Product id is required!" })
        const product = await Products.findById({ _id: pId });
        console.log(product, "product");
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ success: true, product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const updateProduct = async (req, res) => {
    try {
        const pId = req.params.pId
        const { name, price, category, image } = req.body.productData;

        if (!name || !price || !category || !image) return res.status(400).json({ message: "All fields are required!" })
        console.log(name, price, category, image, "name, price, category,image");

        if (!pId) return res.status(400).json({ message: "Product ID is required!" })
        const product = await Products.findOneAndUpdate({ _id: pId }, { name, price, category, image }, { new: true }).exec();
        console.log(product, "updated product");

        if (product) {
            return res.status(200).json({ success: true, message: "Product updated successfully!", product })
        } else {
            return res.status(404).json({ message: "Product not found!" })
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Internal server error!" })
    }
}



export const deleteProduct = async (req, res) => {
    try {
        const { pId } = req.body;
        console.log(pId, "lllllll");
        if (!pId) return res.status(400).json({ message: "Product ID is required!" })

        const products = await Products.findByIdAndDelete({ _id: pId }, { new: true })
        console.log(products, "jkkfjvddd");
        if (!products) return res.status(404).json({ message: "Product not found!" })

        return res.status(200).json({ success: true, message: "Product Deleted successfully!", products })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error!" })
    }
}



export const getByCategory = async (req, res) => {
    try {
        const { category } = req.query; // Use req.query to get the category parameter from the URL query string

        const query = category ? { category } : {}; // If a category is provided, filter by category; otherwise, fetch all products

        const products = await Products.find(query).exec();

        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: "No Products Found!" });
        }

        return res.status(200).json({ success: true, products });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "An error occurred!" });
    }
}


