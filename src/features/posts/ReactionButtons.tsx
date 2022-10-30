import React from 'react';
import {Post, reactionAdded} from "./postsSlice";
import {useDispatch} from "react-redux";

export type Keys = keyof typeof reactionEmoji_;

type ReactionEmoji = {
    [key in Keys]: string;
};

const reactionEmoji: ReactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}

const reactionEmoji_ = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
}


type ReactionButtonsProps = {
    post: Post
}

export const ReactionButtons = ({ post }: ReactionButtonsProps) => {
    const dispatch = useDispatch();

    const reactionButtons  = Object.entries(reactionEmoji). map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="muted-button reaction-button"
                onClick={() => dispatch(reactionAdded({id: post.id, reactionName: name as Keys}))}
            >
                {emoji} {post.reactions[name as Keys]}
            </button>
        )
    })
    return (
        <div>
            {reactionButtons}
        </div>
    );
};
