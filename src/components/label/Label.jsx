import "./Label.css";

function Label ({className="", htmlFor, children}) {
    // const { children } = this.props;
    return(
        <label className={"label-title " + className} htmlFor={htmlFor}>
            {children}
        </label>
    )
}

export default Label;