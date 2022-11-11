import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import React, {useEffect} from "react";
import {RootState} from "../../app/store";
import PostAuthor from "./PostAuthor";
import {TimeAgo} from "./TimeAgo";
import {ReactionButtons} from "./ReactionButtons";
import {fetchPosts, Post, selectAllPosts, selectPostById, selectPostIds} from "./postsSlice";
import {Spinner} from "../../components/Spinner";
import {EntityId} from "@reduxjs/toolkit";
import {useGetPostsQuery} from "../api/apiSlice";

const PostExcerpt = React.memo(({ post }: any) => {
    // const post = useSelector((state: RootState) => selectPostById(state, postId))


    return (
        <article className="post-excerpt">
            {post &&
                <>
                    <h3>{post.title}</h3>
                    <div>
                        <PostAuthor userId={post.user}/>
                        <TimeAgo timestamp={post.date}/>
                    </div>
                    <p className="post-content">{post.content.substring(0, 100)}</p>
                    <ReactionButtons post={post}/>
                    <Link
                        to={`/posts/${post.id}`} className="button muted-button">
                        View Post
                    </Link>
                </>
            }
        </article>
    )
})

const PostsList = () => {
    // @ts-ignore
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError
    } = useGetPostsQuery('')

    let content

    if (isLoading) {
        content = <Spinner text="Loading..." />
    } else if (isSuccess) {
        // @ts-ignore
        content = posts.map(post => <PostExcerpt key={post.id} post={post} />)
    } else if (isError) {
        // @ts-ignore
        content = <div>{error.toString()}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    );
};

export default PostsList;