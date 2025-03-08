import './Metascore.css'

function Metascore ({value=null, className}) {
    let colorStyling = ""

    if (value && value >= 75) {
        colorStyling = "green";
    } else if (value && value >= 50 && value < 75) {
        colorStyling = "orange";
    } else  if (value && value < 50) {
        colorStyling = "red";
    } else {
        colorStyling = "white"
    }

    return(
        <p className={`metascore ${className} ${colorStyling}`}>{value ? value : "geen"}</p>
    )
}

export default Metascore;