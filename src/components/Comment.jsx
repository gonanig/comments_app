"use strict";

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
  updateComment,
  setActiveComment,
  parentId = null,
  backendComments,
  avatar,
}) => {
  const { username, id, body, createAt, userId, forAnswer } = comment;
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

  return (
    <div className="comment">
      <div
        className={
          replies.length || parentId === null
            ? "comment-image-container"
            : "replies-image-container"
        }
      >
        {!avatar ? (
          <img
            src={
              currentUserId == 1 && userId == 1
                ? "https://goop-img.com/wp-content/uploads/2020/06/Mask-Group-2.png"
                : faker.image.people()
            }
            alt="User Avatar "
          />
        ) : (
          <img
            src={
              currentUserId == 1 && userId == 1
                ? "https://goop-img.com/wp-content/uploads/2020/06/Mask-Group-2.png"
                : avatar
            }
            alt="User Avatar "
          />
        )}
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{username}</div>
          {forAnswer && (
            <div className="comment-forAnswer">
              {forAnswer ? ` to ${forAnswer}` : null}
            </div>
          )}
          <div className="comment-time"> {createdAt}</div>
        </div>
        {!isEditing && <div className="comment-text">{body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={body}
            handleSubmit={(text) => updateComment(text, id, parentId)}
            handleCancel={() => setActiveComment(null)}
          />
        )}
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
            <span
              className="comment-action"
              onClick={() => {
                deleteComment(id);
              }}
            >
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
            backendComments={backendComments}
            activeComment={activeComment}
            hasCancelButton
            handleCancel={() => setActiveComment(null)}
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                avatar={faker.image.animals()}
                comment={reply}
                key={reply.id}
                replies={[]}
                deleteComment={deleteComment}
                updateComment={updateComment}
                addComment={addComment}
                parentId={id}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                currentUserId={currentUserId}
                backendComments={backendComments}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Comment;
