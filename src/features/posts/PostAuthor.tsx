import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

type PostAuthorProps = {
    userId: string
}

const PostAuthor = ({ userId }: PostAuthorProps) => {
    const author = useSelector((state:RootState) => state.users.find(user => user.id === userId))



    return (
        <span>
            by {author ? author.name: 'Unknown author'}
        </span>
    );
};

export default PostAuthor;