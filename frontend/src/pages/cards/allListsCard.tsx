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
                        <h2>List:  {list.name} </h2>
                        <p>Description: {list.description} </p>
                        <p>Like: {list.favorite ? "Yes" : "No"}</p>
                        <div>
                            <h4>Article:</h4>
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