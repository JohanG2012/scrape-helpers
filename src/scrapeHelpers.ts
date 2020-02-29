import fetch from "node-fetch";

export const scrapeHeaders = {
    Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language':
        'sv-SE,sv;q=0.9,th-TH;q=0.8,th;q=0.7,en-US;q=0.6,en;q=0.5',
    'Cache-Control': 'no-cache',
    'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
}

export const getStaticHTML = async (url: string) => {
    const response = await fetch(url, { method: 'GET', headers: scrapeHeaders });
    return await response.text();
};