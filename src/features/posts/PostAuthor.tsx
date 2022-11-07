import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {selectUserById} from "../users/usersSlice";

type PostAuthorProps = {
    userId: string
}

const PostAuthor = ({ userId }: PostAuthorProps) => {
    const author = useSelector((state:RootState) => selectUserById(state, userId))



    return (
        <span>
            by {author ? author.name: 'Unknown author'}
        </span>
    );
};

export default PostAuthor;