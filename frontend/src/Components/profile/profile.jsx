import Navbar from "../Navbar";
import "../profile/allProfile.css"
import "../../Css/style.css";
import "../../Css/responsive.css";
import * as Icon from 'react-bootstrap-icons';


const Profile =()=>{
    return(
        <>
        <Navbar/>
        <div className="commonScreen">
            <div className="outerprofileSection">
                <div className="profInfoInouterPro">
                    <div className="proNameEmailTxt">
                        <h1>Mayuri</h1>
                        <p>mayuri@gmail.com</p>
                    </div>
                        <button className="proEditBtn">Edit Profile</button>
                </div>


                <div className="profileMainInfoContentWrapper">
                   <div className="procontentContainer">
                        <div className="leftprofileOptionWrap">
                            <div className="profOptionContainer">
                                <span><Icon.BagFill style={{fontSize:"1.6rem"}}/></span>
                                <span>Orders</span>
                            </div>
                            <div className="profOptionContainer">
                                <span><Icon.GooglePlay style={{fontSize:"1.6rem"}}/></span>
                                <span>Swiggy One</span>
                            </div>
                            <div className="profOptionContainer">
                                <span><Icon.HeartFill style={{fontSize:"1.6rem"}}/></span>
                                <span>favourites</span>
                            </div>
                            <div className="profOptionContainer">
                                <span><Icon.CreditCardFill style={{fontSize:"1.6rem"}}/></span>
                                <span>Payments</span>
                            </div>
                            <div className="profOptionContainer">
                                <span><Icon.GeoAltFill style={{fontSize:"1.6rem"}}/></span>
                                <span>Address</span>
                            </div>
                            <div className="profOptionContainer">
                                <span><Icon.GearFill style={{fontSize:"1.6rem"}}/></span>
                                <span>Setttings</span>
                            </div>
                        </div>
                        <div className="rightProfileContentWrap">

                        </div>
                   </div>
                </div>
            </div>


        </div>
        </>
    )
}

export default Profile;