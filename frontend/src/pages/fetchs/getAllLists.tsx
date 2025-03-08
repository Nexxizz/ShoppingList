import  { useEffect, useState } from 'react';
import { List } from '../interfaces/list';
import { AllListsCard } from "../cards/allListsCard.tsx";

export const GetAllLists = () => {
    const [data, setData] = useState<List[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/lists/showAllListsWithArticle');
            const data = await response.json();
            setData(data);
        };

        fetchData();
    }, []);

    return <AllListsCard data={data} />;
};