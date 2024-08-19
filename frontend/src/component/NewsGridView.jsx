import { useState, useEffect } from "react";
import Card from "./Card";
import Grid from "./Grid";

export default function NewsGridView() {

    const [newsList, setNewsList] = useState([]);
  
    useEffect(() => {
        fetch("http://localhost:3000/api/news")
            .then((res) => res.json())
            .then((newsData) => {setNewsList(newsData)})
    },[]);

    return (
        <Grid >
            {newsList.map((news) => {
                return <Card key={news.id} title={news.title} featureImage={news.image_url} description={news.description} url={news.url}/>
            })}
        </Grid>
    );
}