import { AddList } from "./modals/addList.tsx";
import "./CreateListPage.css";

export const CreateListPage = () => {
    return (
        <div className="create-list-page">
            <h1>Create a New List</h1>
            <div className="create-list-container">
                <AddList />
            </div>
        </div>
    );
}