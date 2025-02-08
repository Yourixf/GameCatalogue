import "./Button.css";

function Button ({onClick, disabled=false, className="", content="", type="button"}) {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={"button-main "+className}>
            {content}
        </button>
    )
}

export default Button;