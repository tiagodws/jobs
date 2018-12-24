const BASE_URL = `https://www.google.com/maps/search/?api=1`;

export function getSearchUrl(search) {
    return `${BASE_URL}&query=${search}`;
}
