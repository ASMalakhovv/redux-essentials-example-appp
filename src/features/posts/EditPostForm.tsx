import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {postUpdated} from "./postsSlice";
import {PropsType} from "./SinglePostPage";
import {useEditPostMutation, useGetPostQuery} from "../api/apiSlice";


export const EditPostForm = ({ match }: PropsType) => {
    const { postId } = match.params;

    const {data: post} = useGetPostQuery(postId)

    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)

    const history = useHistory();
    const [updatePost, {isLoading}] = useEditPostMutation();

    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

    const onSavePostClicked = async () => {
        if (title && content) {
            debugger
            await updatePost({ id: postId, title, content })
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