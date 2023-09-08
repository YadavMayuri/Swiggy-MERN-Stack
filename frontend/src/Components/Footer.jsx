import "../Css/style.css";
import "../Css/responsive.css";
import * as Icon from 'react-bootstrap-icons';


const Footer = () => {
    return (
        <>
            <div>

                <div className="section-4">
                    <div className="footer-1">
                        <div className="company">
                            <div className="footer-top-heading">Company</div>
                            <ul className="footer-opt">
                                <li><a href="">About us </a></li>
                                <li><a href="">Team </a></li>
                                <li><a href="">Careers </a></li>
                                <li><a href="">Swiggy Blog </a></li>
                                <li><a href="">Bug Bounty </a></li>
                                <li><a href="">Swiggy one </a></li>
                                <li><a href="">Swiggy Corporate </a></li>
                                <li><a href="">Sweiggy Instamart </a></li>
                                <li><a href="">Swiggy Genie </a></li>
                            </ul>
                        </div>
                        <div className="contact">
                            <div className="footer-top-heading">Contact</div>
                            <ul className="footer-opt">
                                <li><a href="">Help & Support </a></li>
                                <li><a href="">Partner With us </a></li>
                                <li><a href="">Ride With us </a></li>

                            </ul>
                        </div>
                        <div className="legal">
                            <div className="footer-top-heading">Legal</div>
                            <ul className="footer-opt">
                                <li><a href="">Terms & Conditions </a></li>
                                <li><a href="">Refund & Cancellation </a></li>
                                <li><a href="">Privacy Policy </a></li>
                                <li><a href="">Cookie Policy </a></li>
                                <li><a href="">Offer Terms </a></li>
                                <li><a href="">Phishing & Fraud </a></li>
                                <li><a href=""> Corporate – Swiggy Money Codes Terms and Conditions</a></li>
                                <li><a href=""> Corporate - Swiggy Discount Voucher Terms and Conditions</a></li>

                            </ul>

                        </div>
                        <div className="get-app">

                            <div className="footer-apps-img">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/iOS_ajgrty" alt="" />
                            </div>
                            <div className="footer-apps-img">
                                <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_108/play_ip0jfp" alt="" />
                            </div>
                        </div>
                    </div>
                    <hr className="hr-line" />
                    <div className="footer-2">
                        <div className="footer-top-heading">we deliver to</div>
                        <div className="name-of-cities">
                            <div className="city-to-deliver">
                                <ul className="footer-opt">
                                    <li><a href="">Abhor </a></li>
                                    <li><a href="">Adilabad </a></li>
                                    <li><a href="">Adityapur </a></li>
                                    <li><a href="">Adoni </a></li>
                                    <li><a href="">Agartala </a></li>
                                </ul>
                            </div>
                            <div className="city-to-deliver">
                                <ul className="footer-opt">
                                    <li><a href="">Deharadun </a></li>
                                    <li><a href="">Dehari </a></li>
                                    <li><a href="">Delhi </a></li>
                                    <li><a href="">Deoghar </a></li>
                                    <li><a href="">Deoria-city </a></li>
                                </ul>
                            </div>
                            <div className="city-to-deliver">
                                <ul className="footer-opt">
                                    <li><a href="">Khana </a></li>
                                    <li><a href="">Kharagpur </a></li>
                                    <li><a href="">Kishanganj </a></li>
                                    <li><a href="">Kishangarh </a></li>
                                    <li><a href="">Kochi </a></li>
                                </ul>
                            </div>
                            <div className="city-to-deliver">
                                <ul className="footer-opt">
                                    <li><a href="">Purulia </a></li>
                                    <li><a href="">Pusad </a></li>
                                    <li><a href="">Puttur </a></li>
                                    <li><a href="">Rae-Bareli </a></li>
                                    <li><a href="">Raghunathpur </a></li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <hr className="hr-line" />

                    <div className="footer-3">
                        <div className="swiggy-logo">
                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_284/Logo_f5xzza" alt="" />
                        </div>
                        <div className="copyright">
                            © 2023 Swiggy
                        </div>
                        <div className="social-media-icons">
                            <a href=""><Icon.Facebook/> </a>
                            <a href=""><Icon.Instagram/> </a>
                            <a href=""><Icon.Pinterest/> </a>
                            <a href=""><Icon.Twitter/> </a>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Footer;