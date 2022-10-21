import { useEffect, useState } from "react";

const Comment = ({
    comment
}) => {
    return (
        <li className="comment">
            <p><b>{comment.comment}</b></p>
            <p><i>author: {comment?.user?.email}</i></p>
        </li>
    );
}

export default Comment;