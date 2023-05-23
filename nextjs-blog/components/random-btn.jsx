import Link from 'next/link';
import { useState, useEffect } from 'react';

const get_random = () => {
    let r = Math.floor(Math.random() * 650)
    while (r > 2 && r < 7) {
        r = Math.floor(Math.random() * 650)
    }
    return r;
}

export default function RandBtn(props) {
    const [random, setRandom] = useState(`/details/${get_random()}`)

    useEffect( () => {
        setRandom(`/details/${get_random()}`)
    }, [])
    
    const rand = () => {
        setRandom(`/details/${get_random()}`)
    }

    return (
        <Link href={random}>
            <button onClick={rand} className='random-button'>Aleatório (mas não o charmander)</button>
        </Link>
    )
  }