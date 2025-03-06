import { Link } from "react-router-dom";
import "./Nav.css";

export const Navigation = () => {
    return (
        <nav className="navigation">
            <Link to="/home" className="nav-link">
                Home
            </Link>
        </nav>
    )
}