const Comment = ({
    comment
}) => {
    return (
        <li className="comment">
            <p>Content: {comment.content}</p>
        </li>
    );
}

export default Comment;