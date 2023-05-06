const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"

const getPagesCache = () => {
    const data = localStorage.getItem('pages')
    return data ? JSON.parse(data) : null
}

const updatePagesCache = (newResults, nextPage) => {
    const cache = getPagesCache()
    const pages = cache ? cache : {results: [], nextPage: null}
    const results = [...pages.results, ...newResults]
    localStorage.setItem('pages', JSON.stringify({results, nextPage}))
}

export const get_page = async (url) => {
    const cache = getPagesCache()
    if (!url && cache) {
        console.log('CACHE PAGE')
        return new Promise((resolve, reject) => {
            resolve(cache)
        })
    }
    const response = await fetch(url ? url : BASE_URL);
    const data = await response.json()
    updatePagesCache(data.results, data.next)
    console.log('NO CACHE!!! PAGE')
    return {results: data.results, nextPage: data.next}
}

const getPkmCache = () => {
    const data = localStorage.getItem('pokemons')
    return data ? JSON.parse(data) : null
}

const updatePkmCache = (newPkm) => {
    const cache = getPkmCache()
    const pkms = cache ? cache : {}
    if (newPkm.id in pkms) {
        return;
    }
    pkms[newPkm.id] = newPkm
    localStorage.setItem('pokemons', JSON.stringify(pkms))
}

export const get_pokemon = async (url) => {
    const id = url.length > 5 ? url.match(/\/\d+\//)[0].replace('/', '').replace('/', '') : url
    const cache = getPkmCache()
    if (cache && id in cache) {
        console.log('CACHE PKM')
        return new Promise((resolve, reject) => {
            resolve(cache[id])
        })
    }
    const response = await fetch(BASE_URL + id);
    const data = await response.json();
    delete data.moves
    delete data.abilities
    delete data.game_indices
    data.sprite = data.sprites.versions['generation-v']['black-white']['animated']['front_default']
    data.icon = data.sprites.versions['generation-vii']['icons']['front_default']
    delete data.sprites
    updatePkmCache(data)
    console.log('NO CACHE!!! PKM')
    return data
}