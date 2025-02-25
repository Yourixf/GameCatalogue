import "./Input.css";

function Input ({className="", type='text', name='', id, placeholder, disabled,  register, validationRules, errors }) {
        return(
            <>
                <input className={"input-field " + className}
                       id={id} type={type} name={name}
                       disabled={disabled}
                       placeholder={placeholder}
                       {...(register ? register(id, validationRules) : {})}

                />
                {register && errors[id] && <p className={"input-error"}>{errors[id].message}</p>}
            </>
        );


}

export default Input;