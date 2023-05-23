import Link from 'next/link';
import PokemonCard from '../components/pokemon-card';
import { get_page, get_pokemon } from '../services/requests';
import { useState, useEffect } from 'react';


const get_random = () => {
  let r = Math.floor(Math.random() * 650)
  while (r > 2 && r < 7) {
    r = Math.floor(Math.random() * 650)
  }
  return r;
}

export default function Home() {
  const [page, setPage] = useState(1)
  const [pkmList, setPkmList] = useState([])
  const [next, setNext] = useState(null)
  const [random, setRandom] = useState(`details/${get_random()}`)
  const load_page = async () => {
    const {results, nextPage} = await get_page(next)
    const newList = await Promise.all(results.map( async (raw) => {
      return await get_pokemon(raw.url)
    }))
    setNext(nextPage)
    setPkmList([...pkmList, ...newList])
    setPage(page + 1)
    setRandom(`details/${get_random()}`)
  }

  useEffect( () => {
    load_page()
  }, [])

  useEffect( () => {
    // console.log(window.innerHeight, window.innerHeight + window.pageYOffset, document.body.offsetHeight)
    const timer = setInterval(() => {
      if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2*window.innerHeight/3) {
        load_page()
      }
      
    }, 400);
    return () => clearTimeout(timer);
  })


  return (
    <>
      <main>
        <Link href={random}>
            <button  className='random-button'>Aleatório(mas não o charmander)</button>
        </Link>
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
