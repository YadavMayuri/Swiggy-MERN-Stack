import "../profile/allProfile.css"
import "../../Css/style.css";
import "../../Css/responsive.css";

const MyOrders = ()=>{
    return(
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
    
    
    </>
    )
}

export  default MyOrders ;
