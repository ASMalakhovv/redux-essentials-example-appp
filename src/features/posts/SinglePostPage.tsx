import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {useSelector} from "react-redux";
import PostAuthor from "./PostAuthor";
import {ReactionButtons} from "./ReactionButtons";
import {selectPostById} from "./postsSlice";
import {RootState} from "../../app/store";



type Match = {
    postId: string
}

export type PropsType = RouteComponentProps<Match>

const SinglePostPage = ({ match }: PropsType) => {
    const { postId } = match.params;

    const post = useSelector((state:RootState) => selectPostById(state,postId));

    if(!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <div>
            <section>
                <article className="post">
                    <h2>{post.title}</h2>
                    <p className="post-content">{post.content}</p>
                    <PostAuthor userId={post.id} />
                    <ReactionButtons post={post} />
                </article>
            </section>
        </div>
    );
};

export default SinglePostPage;