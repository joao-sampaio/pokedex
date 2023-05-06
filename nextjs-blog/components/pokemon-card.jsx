import Link from 'next/link';

export default function PokemonCard(props) {
    const {id, name} = props.data
    const icon = props.data.icon
    return (
        <Link href={`/details/${id}`}>
        <div className="pokemon-card">
            <div className="pokemon-card icon-card">
                <img src={ icon } alt={ `${name} icon` } />
            </div>
            <div className="flex data-card">
                <p className="id">{ id }</p>
                <p className="name">{ name }</p>
            </div>
        </div>
        </Link>
    )
  }