import "./HomePage.css";
import { GetAllLists } from "./fetchs/getAllLists.tsx";

export const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Your Shopping Lists: </h1>
            <div className="lists-section">
                <GetAllLists />
            </div>
        </div>
    );
}