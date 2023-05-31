import Link from 'next/link';
import { useState, useEffect } from 'react';

const get_random = () => {
    return Math.floor(Math.random() * 650);
}

export default function RandBtn(props) {
    const [random, setRandom] = useState(`/details/${get_random()}`);

    useEffect( () => {
        setRandom(`/details/${get_random()}`);
    }, [])
    
    const rand = () => {
        setRandom(`/details/${get_random()}`);
    }

    return (
        <Link href={random}>
            <button onClick={rand} className='random-button'>Aleatório</button>
        </Link>
    )
  }