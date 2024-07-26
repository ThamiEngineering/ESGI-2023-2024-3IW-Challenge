const url = 'https://olympics.com/fr/paris-2024';

function fetchPage(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            throw error;
        });
}

function extractArticles(html) {
    html = html.replaceAll('href="/_pr', 'href="https://olympics.com/_pr');
    const tempJSDom = document.createElement('html');
    tempJSDom.innerHTML = html;

    const articles = [];
    const elements = tempJSDom.querySelectorAll('.react-multi-carousel-list li');

    elements.forEach((element) => {
        const articlesDOM = element.querySelectorAll('div article');
        articlesDOM.forEach((article) => {
            const title = article.querySelector('h3')?.textContent.trim();
            const link = article.querySelector('a')?.href;
            const image = article.querySelector('img')?.src;

            if (title && link && image) {
                articles.push({ title, link, image });
            }
        });
    });

    return articles;
}

async function articlesScraper() {
    try {
        const html = await fetchPage(url);
        const articles = extractArticles(html);

        if (articles.length > 0) {
            return articles;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export default articlesScraper;