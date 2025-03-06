import { Link } from "react-router-dom";


export const Navigation = () => {
    return (
        <nav style={{background: "lightgreen", padding: "15px", display: "flex", justifyContent: "center"}}>
            <Link to="/home" style={{fontSize: "28px", textDecoration: "none"}}>
                Home
            </Link>
        </nav>
    )
}


