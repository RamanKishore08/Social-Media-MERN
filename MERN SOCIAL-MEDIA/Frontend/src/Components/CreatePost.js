import React, { useState } from "react";
import axios from "axios";
import './CreatePost.css'; // Import the CSS file

function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (file) {
            formData.append("file", file);
        }

        axios
            .post("http://localhost:5000/api/posts", formData)
            .then((response) => {
                console.log("Post created:", response.data);
                setTitle("");
                setContent("");
                setFile(null);
            })
            .catch((error) => console.error("Error creating post:", error));
    };

    return (
        <div className="create-post">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreatePost;
