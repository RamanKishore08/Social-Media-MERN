import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
    const [posts, setPosts] = useState([]);
    const [commentInputs, setCommentInputs] = useState({}); // For individual comment inputs

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/posts")
            .then((response) => setPosts(response.data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    const handleLike = (postId) => {
        axios
            .post(`http://localhost:5000/api/posts/like/${postId}`)
            .then((response) => {
                const updatedPosts = posts.map((post) =>
                    post._id === postId ? response.data : post
                );
                setPosts(updatedPosts);
            })
            .catch((error) => console.error("Error liking post:", error));
    };

    const handleAddComment = (postId, commentText) => {
        axios
            .post(`http://localhost:5000/api/posts/comment/${postId}`, {
                text: commentText,
            })
            .then((response) => {
                const updatedPosts = posts.map((post) =>
                    post._id === postId ? response.data : post
                );
                setPosts(updatedPosts);
                setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
            })
            .catch((error) => console.error("Error adding comment:", error));
    };

    const handleCommentChange = (postId, value) => {
        setCommentInputs((prev) => ({ ...prev, [postId]: value }));
    };

    return (
        <div className="home">
            <h2>Recent Posts</h2>
            {posts.map((post) => (
                <div key={post._id} className="post">
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    {post.file && (
                        <div>
                            {post.file.includes(".mp4") ? (
                                <video width="100%" controls>
                                    <source
                                        src={`http://localhost:5000/uploads/${post.file}`}
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            ) : (
                                <img
                                    src={`http://localhost:5000/uploads/${post.file}`}
                                    alt="Post Media"
                                    style={{ width: "100%", borderRadius: "5px" }}
                                />
                            )}
                        </div>
                    )}
                    <p>Likes: {post.likes}</p>
                    <button onClick={() => handleLike(post._id)}>Like</button>
                    <p>Comments: {post.comments.length}</p>
                    <ul>
                        {post.comments.map((comment, index) => (
                            <li key={index}>{comment.text}</li>
                        ))}
                    </ul>

                    <input
                        type="text"
                        placeholder="Add a comment"
                        className="comment-input"
                        value={commentInputs[post._id] || ""}
                        onChange={(e) => handleCommentChange(post._id, e.target.value)}
                    />
                    <button
                        onClick={() => handleAddComment(post._id, commentInputs[post._id] || "")}
                        className="comment-button"
                    >
                        Add Comment
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Home;
