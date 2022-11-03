import React from 'react';
import {Link, RouteComponentProps} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {selectUserById} from "./usersSlice";
import {selectAllPosts} from "../posts/postsSlice";

type Match = {
    userId: string
}

export const UserPage = ({ match }: RouteComponentProps<Match>) => {
    const { userId } = match.params

    const user = useSelector((state:RootState) => selectUserById(state, userId));

    const postsForUser = useSelector((state: RootState) => {
        const allPosts = selectAllPosts(state)
        return allPosts.filter(post => post.user === userId)
    } )

    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            {user && <h2>{user.name}</h2>}

            <ul>{postTitles}</ul>
        </section>
    );
};