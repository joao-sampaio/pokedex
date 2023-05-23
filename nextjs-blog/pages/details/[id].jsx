import { get_pokemon } from '../../services/requests';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TypeCard from '../../components/types-card';

export default function Details() {
    const [data, setData] = useState({})
    
    const router = useRouter();
    const { id } = router.query;

    const load_page = async () => {
        const raw = await get_pokemon(id)
        setData(raw)
    }

    useEffect( () => {
        if(!id || (id > 2 && id < 7)) {
            return;
        }
        load_page()
    }, [id])

    return (
        <div className='height-limit'>
        <Link href={`/`}>
            <button  className='back-button'>back</button>
        </Link>
        <div className='details'>
            <img className='sprite' src={ data.sprite } alt={ `${data.name} sprite` } />
            <div className='transparent-div wide'>
                <p className='name'>{`${data.id} ${data.name}`}</p>
                <img src={ data.icon } alt={ `${data.name} icon` } />
            </div>
            <div className='white-div wide'>
                {data.types && data.types.map((type, index) => <TypeCard key={index} type={type}/>)}
            </div>
            <div className='black-div wide'>
                <p className=''>{`height: ${data.height/10} m`}</p>
                <p className=''>{`weight: ${data.weight/10} kg`}</p>
            </div>
            <div className='flex red-div wide'>
            </div>
        </div>
        </div>
    )
}