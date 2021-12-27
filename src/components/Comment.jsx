import faker from "faker";
import "../styles/comment.scss";
import CommentForm from "./CommentForm";
const Comment = ({
  comment,
  replies,
  currentUserId,
  deleteComment,
  activeComment,
  addComment,
  setActiveComment,
  parentId = null,
}) => {
  const { username, id, body, createAt, userId } = comment;

  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId == userId;
  const canDelete = currentUserId == userId;
  const createdAt = new Date(createAt).toLocaleDateString("es-CL");
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === id;

  const isEditing =
    activeComment &&
    activeComment.type === "editing" &&
    activeComment.id === id;

  const replyId = parentId ? parentId : id;

  const replyComment = (text, replyId) => {
    parentId = null;
    fetch(`http://localhost:8000/comments?_embed=replies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 651151,
        body: text,
        username: "Terry Bator",
        parentId: activeComment.id,
        userId: 1,
        createAt: "22222",
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((comment) => {
        replies.push(comment);
        setActiveComment(null);
      });
  };

  return (
    <div className="comment">
      <div
        className={
          replies.length || parentId === null
            ? "comment-image-container"
            : "replies-image-container"
        }
      >
        <img src={faker.image.people()} alt="User Avatar " />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{username}</div>
          <div className="comment-time">{createdAt}</div>
        </div>
        <div className="comment-text">{body}</div>
        <div className="comment-actions">
          {canEdit && (
            <span
              className="comment-action"
              onClick={() =>
                setActiveComment({
                  id,
                  type: "editing",
                })
              }
            >
              Edit
            </span>
          )}
          {canDelete && (
            <span className="comment-action" onClick={() => deleteComment(id)}>
              Delete
            </span>
          )}
          {canReply && (
            <span
              className="comment-action"
              onClick={() =>
                setActiveComment({
                  id,
                  type: "replying",
                })
              }
            >
              Reply
            </span>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            replyComment={(text) => replyComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                replies={[]}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Comment;
