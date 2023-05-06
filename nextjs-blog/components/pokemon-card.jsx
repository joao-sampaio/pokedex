import Link from 'next/link';


//sprite: sprites[versions][generation-v][black-white][animated][front_default]
//icon: sprites[versions][generation-vii][icons][front_default]
export default function PokemonCard(props) {
    const {id, name} = props.data
    const icon = props.data.sprites.versions['generation-vii']['icons']['front_default']
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