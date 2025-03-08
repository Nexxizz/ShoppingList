import { useState, FormEvent } from "react";
import { List } from "../interfaces/list.tsx";
import "./addList.css";

export const AddList = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [favorite, setFavorite] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        const newList: Partial<List> = {
            name,
            description,
            create_date: new Date(),
            update_date: new Date(),
            favorite,
            articles: []
        };
        
        try {
            const response = await fetch('http://localhost:3000/lists/createList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newList),
            });
            
            if (response.ok) {
                // Clear form or redirect
                setName("");
                setDescription("");
                setFavorite(false);
                alert("List created successfully!");
            } else {
                alert("Failed to create list");
            }
        } catch (error) {
            console.error("Error creating list:", error);
        }
    };

    return (
        <div className="add-list-form">
            <h2>Add New List</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        id="name"
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea 
                        id="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                
                <div className="form-group">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={favorite} 
                            onChange={() => setFavorite(!favorite)} 
                        />
                        Add to favorites
                    </label>
                </div>
                
                <button type="submit">Add List</button>
            </form>
        </div>
    );
}