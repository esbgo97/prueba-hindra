import React, { useCallback, useContext } from 'react'
import Firebase from '../infrastructure/Firebase';
import { AuthContext } from '../utils/Auth';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const Login = (props: any) => {
    const handleSubmit = useCallback(async ev => {
        ev.preventDefault();
        const { email, password } = ev.target.elements

        try {
            await Firebase.auth().signInWithEmailAndPassword(email.value, password.value)

            props.history.push("/posts")
        } catch (err) {
            alert(err)
        }

    }, [props.history])

    const cont = useContext(AuthContext) as any
    console.log(cont.currentUser)
    if (cont.currentUser) {
        return <Redirect to="/posts" />
    }

    return (
        <div>
            <h1>Ingreso</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input name="email" type="text" />
                </label>
                <br />
                <label>
                    Contraseña:
                    <input name="password" type="password" />
                </label>

                <br />
                <button type="submit">
                    Ingresar
                </button>
                <Link to="/signup" >
                    Registrarse
                    </Link>
            </form>

        </div>
    )
}

export default Login