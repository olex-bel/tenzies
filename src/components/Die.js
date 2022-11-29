
export default function Die(props) {
    const cssStateClass = props.isHeld? 'die__held' : 'die__release';

    return (
        <div className={`die ${cssStateClass}`} onClick={props.hold}>
            <div className="die--text">{props.value}</div>
        </div>
    );
}