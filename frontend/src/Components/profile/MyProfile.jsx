import Navbar from "../Navbar";
import "../profile/allProfile.css"
import "../../Css/style.css";
import "../../Css/responsive.css";
import * as Icon from 'react-bootstrap-icons';
import MyOrders from "./MyOrders";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import SwiggyProfile from "./SwiggyProfile";
import classnames from "classnames";  // npm i classnames to add additional style

const MyProfile = () => {

    const [selectedOption, setSelectedOption] = useState("Orders");
    const { state } = useContext(AuthContext)
    const renderRightSideComponent = () => {
        switch (selectedOption) {
            case 'Orders':
                return <MyOrders />;
            case 'Swiggyone':
                return <SwiggyProfile />

            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <div className="commonScreen">
                <div className="outerprofileSection">
                    <div className="profInfoInouterPro">
                        <div className="proNameEmailTxt">
                            <h1>{state?.user?.name}</h1>
                            <p>{state?.user?.email}</p>
                        </div>
                        <button className="proEditBtn">Edit Profile</button>
                    </div>


                    <div className="profileMainInfoContentWrapper">
                        <div className="procontentContainer">
                            <div className="leftprofileOptionWrap">

                                <div className={classnames('profOptionContainer', { 'selected-option': selectedOption === 'Orders', 'unselected-option': selectedOption !== 'Orders', })} onClick={() => setSelectedOption('Orders')}>
                                    <span><Icon.BagFill style={{ fontSize: "1.6rem" }} /></span>
                                    <span>Orders</span>
                                </div>

                                <div  className={classnames('profOptionContainer', { 'selected-option': selectedOption === 'Swiggyone', 'unselected-option': selectedOption !== 'Swiggyone', })} onClick={() => setSelectedOption('Swiggyone')}>
                                    <span><Icon.GooglePlay style={{ fontSize: "1.6rem" }} /></span>
                                    <span>Swiggy One</span>
                                </div>

                                <div className="profOptionContainer">
                                    <span><Icon.HeartFill style={{ fontSize: "1.6rem" }} /></span>
                                    <span>favourites</span>
                                </div>
                                <div className="profOptionContainer">
                                    <span><Icon.CreditCardFill style={{ fontSize: "1.6rem" }} /></span>
                                    <span>Payments</span>
                                </div>
                                <div className="profOptionContainer">
                                    <span><Icon.GeoAltFill style={{ fontSize: "1.6rem" }} /></span>
                                    <span>Address</span>
                                </div>
                                <div className="profOptionContainer">
                                    <span><Icon.GearFill style={{ fontSize: "1.6rem" }} /></span>
                                    <span>Setttings</span>
                                </div>
                            </div>


                            {/* right section */}

                            <div className="rightProfileContentWrap">
                                {renderRightSideComponent()}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default MyProfile;