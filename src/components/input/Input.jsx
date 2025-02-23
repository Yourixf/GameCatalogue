import "./Input.css";

function Input ({className="", type='text', id, placeholder, disabled,  register, validationRules, errors, onChange=null, onClick=null }) {
        return(
            <>
                <input className={"input-field " + className}
                       id={id} type={type}
                       disabled={disabled}
                       placeholder={placeholder}
                       {...(register ? register(id, validationRules) : {})}
                       
                        onChange={onChange}
                        onClick={onClick}
                />
                {register && errors[id] && <p className={"input-error"}>{errors[id].message}</p>}
            </>
        );


}

export default Input;