import "./Label.css";

function Label ({className="", htmlFor, children}) {
    return(
        <label className={"label-title " + className} htmlFor={htmlFor}>
            {children}
        </label>
    )
}

export default Label;