import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {postUpdated} from "./postsSlice";
import {PropsType} from "./SinglePostPage";


export const EditPostForm = ({ match }: PropsType) => {
    const { postId } = match.params;

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({ id: postId, title, content, date: new Date().toISOString(), user: postId}))
            history.push(`/posts/${postId}`)
        }
    }

    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                type="text"
                id="postTitle"
                name="postTitle"
                placeholder="What`s on your mind"
                value={title}
                onChange={onTitleChanged}
                />
                <label htmlFor="postTitle">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
            </form>
            <button type="button" onClick={onSavePostClicked}>
                Save Post
            </button>
        </section>
    );
};