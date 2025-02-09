import "./Button.css";

function Button ({onClick, disabled=false, className="", content="", type="button", shadow=true}) {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={"button-main " + [shadow?"button-shadow ": ""] + className}>
            {content}
        </button>
    )
}

export default Button;