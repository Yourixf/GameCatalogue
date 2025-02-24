import "./Input.css";

function Input ({className="", type='text', id, placeholder, disabled,  register, validationRules, errors }) {
        return(
            <>
                <input className={"input-field " + className}
                       id={id} type={type}
                       disabled={disabled}
                       placeholder={placeholder}
                       {...(register ? register(id, validationRules) : {})}

                />
                {register && errors[id] && <p className={"input-error"}>{errors[id].message}</p>}
            </>
        );


}

export default Input;