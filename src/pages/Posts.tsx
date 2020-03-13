import React, { Component, useCallback } from 'react'
import Firebase from '../infrastructure/Firebase'


class Post extends Component<any, any> {
    db: any = null;

    constructor(props: any) {
        super(props);
        this.state = {
            posts: []
        }
        this.db = Firebase.database().ref().child('Post');
    }
    async componentDidMount() {
        const posts = this.state.posts
        this.db.on('child_added', (snap: any) => {
            posts.push({
                postsId: snap.key,
                name: snap.val().name,
                text: snap.val().text
            })
            this.setState({ posts })
        })
    }
    handleSubmit = async (ev: any) => {
        ev.preventDefault();
        const { name, text } = ev.target.elements;
        try {
            const post = {
                text: text.value,
                name: name.value,
                user: Firebase.auth().currentUser?.uid || ""
            };
            await this.db.push().set(post)
        } catch (err) {
            alert(err)
        }
    }

    render() {


        return (
            <div>
                <h1>Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nombre:
                    <input name="name" type="text" />
                    </label>
                    <br />
                    <label>
                        Contenido:
                    <input name="text" type="text" />
                    </label>

                    <br />
                    <button type="submit">
                        Publicar
                </button>
                </form>

                <br />
                <ul>
                    {this.state.posts.map((p: any, k: number) => 
                    <li key={k}><b>{p.name}:</b> - {p.text} - {p.user}</li>)}
                </ul>
                <button onClick={() => { Firebase.auth().signOut() }}>Salir</button>
            </div>

        )
    }
}

export default Post