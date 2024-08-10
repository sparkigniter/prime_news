const pg = require('../database/pg');
const format = require('pg-format');

// Define `getNews` function
const getNews = async () => {
    try {
        const client = await pg.createConnection();
        const res = await client.query("SELECT * FROM article");
        return res.rows; // Return the rows, not the full result object
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error; // Re-throw the error so it can be handled upstream
    }
}

exports.bulkInsert = async function ({ articles }) {
    if(!Array.isArray(articles) || articles.length == 0){
        return false;
    }
    const client = await pg.createConnection(); // Create connection
    try {
        const existingNews = await getNews();
        const urls = existingNews.map(news => news.url); // Extract URLs from existing news
        // Filter articles that do not exist in the existing news
        let data = articles.filter(article => {
            // Check if the article URL is not in the list of existing URLs
            return !urls.includes(article.url);
        }).map(article => [
            article.title,
            article.description,
            article.author,
            null, // snippet
            article.url,
            article.urlToImage,
            null, // language
            article.source,
            article.publishedAt,
            article.content
        ]);

        if (data.length <= 0) {
            return;
        }

        const queryText = `
        INSERT INTO article (title, description, author, snippet, url, image_url, language, source, published_at, content)
        VALUES %L`;

        // Format the query with the data
        const query = format(queryText, data);
        const res = await client.query(query);
        console.log('Bulk insert successful:', res.rowCount, 'rows inserted');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        await client.end(); // Close the connection
    }
};

exports.getAllNews = getNews;
