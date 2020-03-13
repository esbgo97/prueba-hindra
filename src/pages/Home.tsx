import React from 'react'
import Firebase from '../infrastructure/Firebase'


const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => { Firebase.auth().signOut() }}>Salir</button>
        </div>

    )
}

export default Home