import { List } from "../interfaces/list.tsx";

export const AllListsCard = ({
    data
} : {
    data: List[];
})  => {
    return (
        <div className="card">
            { data.map((list) => {
                return (
                    <div key={list.id}>
                        <p> {list.name} <span></span></p>
                        <p> {list.description} </p>
                        <p>Favorite: {list.favorite ? "Yes" : "No"}</p>
                        <div>
                            <h4>Articles:</h4>
                            {list.articles && list.articles.length > 0 ? (
                                <ul>
                                    {list.articles.map(article => (
                                        <li key={article.id}>
                                            {article.name} - {article.description}, Amount: {article.amount}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No articles in this list</p>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}