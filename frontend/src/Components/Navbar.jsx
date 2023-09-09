import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';
import { useContext } from 'react';
import "../Css/style.css"
import "../Css/responsive.css"


const Navbar = () => {

    const { state, dispatch } = useContext(AuthContext)
    const router = useNavigate()
    const LOGOUT = () => {
        dispatch({ type: "LOGOUT" })
        router('/')
    }

    return (
        <>
            <div className="header">
                <div className="navbar">
                    <div className="left-navbar">
                        <div className="product-swiggy-logo">
                            <a href="./index.html">
                                <img src="https://cdn.worldvectorlogo.com/logos/swiggy-1.svg" alt="" />
                            </a>
                        </div>
                        <div className="location-name">
                            <span className="exact-location">Vashi</span>
                            <span className="sub-location"> Navi Mumbai, Maharashtra, India</span>
                            <span className="up-arrow"><i className="fa-solid fa-angle-down"></i></span>
                        </div>
                    </div>


                    <div className="right-navbar">
                        <ul className="p-navbar-list">

                            {state?.user?.role == 'seller' ? (
                                <>
                                    <li className="p-list-item" onClick={()=>router('/addProduct')}>
                                        <a  className="p-icon-link">
                                            <span className="p-nav-icon"> <Icon.FolderPlus className="smIcons" /></span>
                                            <span className="p-nav-menu">Add</span>
                                        </a>
                                    </li>
                                    <li className="p-list-item"  onClick={()=>router('/sellerAllProducts')}>
                                        <a  className="p-icon-link" >
                                            <span className="p-nav-icon"> <Icon.Boxes className="smIcons" /></span>
                                            <span className="p-nav-menu">View</span>
                                        </a>
                                    </li>
                               
                                </>
                            ) :
                                (
                                    <>
                                        <li className="p-list-item">
                                            <a className="p-icon-link">
                                                <span className="p-nav-icon"><Icon.Search /></span>
                                                <span className="p-nav-menu">Search</span>
                                            </a>
                                        </li>
                                        <li className="p-list-item">
                                            <a className="p-icon-link">
                                                <span className="p-nav-icon"><Icon.Percent /></span>
                                                <span className="p-nav-menu">Offers<sup className="sup-new">NEW</sup> </span>
                                            </a>
                                        </li>
                                        <li className="p-list-item">
                                            <a className="p-icon-link">
                                                <span className="p-nav-icon"><Icon.PatchQuestion /></span>
                                                <span className="p-nav-menu">Help</span>
                                            </a>
                                        </li>
                                    </>
                                )}

                            {state?.user ? (
                                <>
                                    <li className="p-list-item">
                                        <a className="p-icon-link">
                                            <span className="p-nav-icon"><Icon.Person /></span>
                                            <span className="p-nav-menu" id="switch">{state?.user?.name}</span>
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="p-list-item" onClick={()=>router('/login')}>
                                        <a className="p-icon-link">
                                            <span className="p-nav-icon"><Icon.Person /></span>
                                            <span className="p-nav-menu" id="switch">Sign In</span>
                                        </a>
                                    </li>
                                </>
                            )}
                            {state?.user?.role == 'seller' ? (
                                <>
                                </>
                            ) : (
                                <>
                                    <li className="p-list-item" onClick={()=>router('/cart')}>
                                        <a className="p-icon-link">
                                            <span className="p-nav-icon"><Icon.Cart /></span>
                                            <span className="p-nav-menu">Cart</span>
                                        </a>
                                    </li>
                                </>
                            )}

                            {state?.user ? (<>
                                <li className="p-list-item" onClick={LOGOUT}>
                                    <a className="p-icon-link">
                                        <span className="p-nav-icon"><Icon.BoxArrowRight /></span>
                                        <span className="p-nav-menu">Logout</span>
                                    </a>
                                </li>
                            </>) : (
                                <>

                                </>
                            )}

                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar;