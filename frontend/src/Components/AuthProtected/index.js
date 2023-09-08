import { useContext, useState } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { useNavigate } from "react-router-dom"
import * as Icon from 'react-bootstrap-icons';
import { useEffect } from "react"


const AuthProtected = ({ children }) => {

    const { state } = useContext(AuthContext)
    const router = useNavigate()

    if (state?.user?.name) {
        // toast.success(state?.user?.name)
        return (children)
    } else {
        return (
            <div style={{ width: "60%", margin: "8rem auto" }}>
                <h1 style={{ marginTop: "2rem", fontSize: "2.8rem", textAlign: "center" }}>This page requires login to access. Please log in first.</h1>
                <button onClick={() => router('/login')} style={{ margin: "4rem auto", backgroundColor: "maroon", color: "white", outline: "none", border: "none", padding: "1rem 4rem", cursor: "pointer", display: "block", fontWeight: "700", fontSize: "1.6rem" }}>Login</button>
            </div>
        )
    }

}

const SellerProtected = ({ children }) => {

    const { state } = useContext(AuthContext);
    const router = useNavigate();
    const [counter, setCounter] = useState(3)
    console.log(state?.user?.role, "user role before useFffect ");

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(i => i - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [])

    useEffect(() => {
        if (!state?.user || state?.user?.role !== 'seller') {   //check if user id not logged in or not seller
            setTimeout(() => { router('/') }, 3000)
            console.log(state?.user?.role, "user role in useFffect ");

        }
    }, [state])

    if (state?.user?.role == 'seller') {
        // toast.success(state?.user?.name)
        return (children)
    } else {
        return (
            <div className="commonScreen" style={{border:".1rem solid white"}}>
                <div style={{ width: "60%", margin: "7rem auto", border: ".2rem solid black ", padding: "3rem 2rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                        <Icon.ExclamationTriangle style={{ fontSize: "2.8rem", textAlign: "center", color: "#fc8019" }} />
                        <h1 style={{ fontSize: "2.8rem", textAlign: "center", color: "#fc8019" }}> Invalid Access!</h1>
                    </div>
                    <h2 style={{ marginTop: "2rem", fontSize: "2.8rem", textAlign: "center" }}>You are not allowed to view this page.</h2>
                    <h3 style={{ marginTop: "2rem", fontSize: "2.4rem", textAlign: "center" }}>Redirecting to home Page in {counter} seconds.</h3>

                </div>
            </div>

        )
    }
}
export { AuthProtected, SellerProtected };