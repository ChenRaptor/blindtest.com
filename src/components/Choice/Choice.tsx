export default function Choice ({choix}:{choix:string}) {

    function handleClick() {
        console.log(choix);
      }

    return (
        <button onClick={handleClick}>{choix}</button>
    )
}