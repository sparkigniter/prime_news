CREATE DATABASE prime_news;

\c prime_news

CREATE TABLE article (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    author TEXT,
    snippet TEXT,
    url TEXT NOT NULL,
    image_url TEXT,
    language TEXT,
    source JSONB,
    content TEXT,
    published_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);