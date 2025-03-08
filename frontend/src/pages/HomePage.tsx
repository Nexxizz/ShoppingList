import "./HomePage.css";
import { GetAllLists } from "./fetchs/getAllLists.tsx";

export const HomePage = () => {
    return (
        <div className="home-container">
            <GetAllLists />
        </div>
    );
}