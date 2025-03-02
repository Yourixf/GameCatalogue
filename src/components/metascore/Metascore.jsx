import './Metascore.css'

function Metascore ({value, className}) {
    let colorStyling = ""

    if (value > 75) {
        colorStyling = "green";
    } else if (value > 50 && value < 75) {
        colorStyling = "orange";
    } else  if (value < 50) {
        colorStyling = "red";
    }


    return(
        <p className={`metascore ${className} ${colorStyling}`}>{value}</p>
    )
}

export default Metascore;