import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isPending, setIsPending] = useState(false)

    const history = useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault(); // prevent the form from reloading when submit button is pressed
        const blog = {title, body, author}; //this is our object that will be sent to db 

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify(blog) //converting our object to json
        }).then(()=>{
            console.log('new blog added')
            setIsPending(false);
            history.push("/")
        })
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit = {handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog body</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                > </textarea>
                <label>Blog author:</label>
                <select
                    value={author}
                    onChange = {(e) => setAuthor(e.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>

                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
                

            </form>
        </div>
    )
}

export default Create
