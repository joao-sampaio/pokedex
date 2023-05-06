import PokemonCard from '../components/pokemon-card';
import { get_page, get_pokemon } from '../services/requests';
import { useState, useEffect } from 'react';


export default function Home() {
  const [page, setPage] = useState(1)
  const [pkmList, setPkmList] = useState([])
  const [next, setNext] = useState(null)
  const load_page = async () => {
    const {results, nextPage} = await get_page(next)
    const newList = await Promise.all(results.map( async (raw) => {
      return await get_pokemon(raw.url)
    }))
    setNext(nextPage)
    setPkmList([...pkmList, ...newList])
    setPage(page + 1)
  }

  useEffect( () => {
    load_page()
  }, [])

  useEffect( () => {
    console.log(window.innerHeight, window.innerHeight + window.pageYOffset, document.body.offsetHeight)
    const timer = setInterval(() => {
      // if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight*0.7) {
      //   load_page()
      // }
      
    }, 400);
    return () => clearTimeout(timer);
  })

  return (
    <>
      <main>
        <div className='pokedex'>
          {
            pkmList.map((pkm, index) => {
              return (
                <PokemonCard key={ index } data={pkm} />
              )
            })
          }
        </div>
      </main>

    </>
  )
}
