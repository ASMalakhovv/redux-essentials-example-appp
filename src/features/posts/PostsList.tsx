import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

const PostsList = () => {
    // @ts-ignore
    const posts = useSelector(state => state.posts);

    // @ts-ignore
    const renderedPosts = posts.map(post => (
        <article className="post-excerpt" key={post.id}>
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <Link to={`/posts/${post.id}`} className="button muted-button">View Post</Link>
            <Link to={`/editPost/${post.id}`} className="button muted-button">Edit Post</Link>
        </article>
    ))

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};

export default PostsList;