const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"

const getPagesCache = () => {
    const data = localStorage.getItem('pages')
    return data ? JSON.parse(data) : null
}

const updatePagesCache = (newResults, nextPage) => {
    const pages = getPagesCache() ? getPagesCache() : {results: [], nextPage: null}
    const results = [...pages.results, ...newResults]
    localStorage.setItem('pages', JSON.stringify({results, nextPage}))
}

export const get_page = async (url) => {
    const cache = getPagesCache()
    console.log(url, cache)
    if (!url && cache) {
        console.log('CACHE')
        return new Promise((resolve, reject) => {
            resolve(cache)
        })
    }
    const response = await fetch(url ? url : BASE_URL);
    const data = await response.json()
    updatePagesCache(data.results, data.next)
    console.log('NO CACHE!!!')
    return {results: data.results, nextPage: data.next}
}

export const get_pokemon = async (url) => {
    const response = await fetch(url.length > 5 ? url : BASE_URL + url);
    const data = await response.json();
    return data
}