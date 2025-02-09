import "./Input.css";

function Input ({className="", type='text', id, placeholder, disabled}) {
    return(
        <input className={"input-field " + className} id={id} type={type} disabled={disabled} placeholder={placeholder}/>
    )
}

export default Input;