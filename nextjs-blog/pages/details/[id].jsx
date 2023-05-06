import { get_pokemon } from '../../services/requests';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Details() {
    const [data, setData] = useState({})
    
    const router = useRouter();
    const { id } = router.query;

    const load_page = async () => {
        const raw = await get_pokemon(id)
        const {name} = raw
        const icon = raw.icon//sprites.versions['generation-vii']['icons']['front_default']
        const sprite = raw.sprite//sprites.versions['generation-v']['black-white']['animated']['front_default']

        setData({id, name, icon, sprite})
    }

    useEffect( () => {
        if(!id) {
            return;
        }
        load_page()
    }, [id])

    return (
        <>
        <Link href={`/`}>
            <button  className='back-button'>back</button>
        </Link>
        <div className='pokedex'>
            <img className='sprite' src={ data.sprite } alt={ `${data.name} sprite` } />
            <div className='transparent-div wide'>
                <p className='name'>{`${data.id} ${data.name}`}</p>
                <img src={ data.icon } alt={ `${data.name} icon` } />
            </div>
            <div className='white-div wide'>
                <p className='name'>{`${data.id} ${data.name}`}</p>
                <img src={ data.icon } alt={ `${data.name} icon` } />
            </div>
            <div className='black-div wide'>
                <p className='name'>{`${data.id} ${data.name}`}</p>
                <img src={ data.icon } alt={ `${data.name} icon` } />
            </div>
            <div className='red-div wide'>
                <p className='name'>{`${data.id} ${data.name}`}</p>
                <img src={ data.icon } alt={ `${data.name} icon` } />
            </div>
        </div>
        </>
    )
}