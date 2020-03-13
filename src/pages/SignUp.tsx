import React, { useCallback } from 'react'
import { withRouter } from 'react-router'
import Firebase from '../infrastructure/Firebase';
import { Link } from 'react-router-dom';

const SignUp = (props:any) => {
    const handleSubmit = useCallback(async ev => {
        ev.preventDefault();
        const { email, password } = ev.target.elements;
        console.log(email, password)
        try {
            await Firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            alert(`Se creó el usuario  ${email.value}`);
            props.history.push("/login")
        } catch (err) {
            alert(err)
        }
    }, [props.history])

    return (
        <div>
            <h1>Registar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario o Correo:
                    <input name="email" type="text" />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input name="password" type="password" />
                </label>

                <br />
                <button type="submit">
                    Enviar
                </button>
                <Link to="/login">
                    Ingresar
                </Link>
            </form>

        </div>

    )
}

export default withRouter(SignUp)