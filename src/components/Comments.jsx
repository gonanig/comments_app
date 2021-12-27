import { useEffect, useState } from "react";
import "../styles/comments.scss";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId) => {
    parentId = null;
    fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.random().toString(36).substr(2, 9),
        body: text,
        username: "Terry Bator",
        parentId: null,
        userId: "1",
        createAt: new Date().toISOString(),
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((comment) => {
        setBackendComments([comment, ...backendComments]);
        setActiveComment(null);
      });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure that you want to remove comment?")) {
      fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
      })
        .then((resp) => {
          return resp.json();
        })
        .then(() => {
          const updatedBackendComments = backendComments.filter(
            (backendComment) => backendComment.id !== commentId
          );
          setBackendComments(updatedBackendComments);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/comments?_embed=replies")
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        setBackendComments(data);
      });
  }, []);

  return (
    <div className="comments">
      <CommentForm submitLabel="Send" handleSubmit={addComment} />
      <div>
        {rootComments.map((rootComment) => (
          <div key={rootComment.id}>
            <Comment
              currentUserId={currentUserId}
              key={rootComment.id}
              comment={rootComment}
              replies={getReplies(rootComment.id)}
              deleteComment={deleteComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              addComment={addComment}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Comments;
