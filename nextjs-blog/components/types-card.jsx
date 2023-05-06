export default function TypeCard(props) {
    return (
        <div className={`type-card ${props.type}`}>
            <p className="name">{ props.type }</p>
        </div>
    )
}