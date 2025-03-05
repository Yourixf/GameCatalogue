import "./Button.css";

function Button ({onClick, disabled=false, className="", content="", type="button", shadow=true, children}) {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={"button-main " + [shadow?"button-shadow ": ""] + className}>
            <span className={"button-content"}> {content}</span>
            {children}
        </button>
    )
}

export default Button;