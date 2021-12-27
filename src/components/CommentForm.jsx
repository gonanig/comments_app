import { useState } from "react";
import "../styles/comment.scss";
import faker from "faker";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
  activeComment,
  backendComments,
}) => {
  const [text, setText] = useState(initialText);
  const isTextAreaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  const toAnswer = backendComments?.filter(
    (comment) => comment?.id == activeComment?.id
  );
  return (
    <div
      className={
        submitLabel == "Reply" || submitLabel == "Update"
          ? "comment-form-replies"
          : "comment-form"
      }
    >
      {submitLabel !== "Reply" && submitLabel !== "Update" && (
        <div className="comment-image-container">
          <img src={faker.image.people()} alt="User Avatar " />
        </div>
      )}
      <form>
        <div className="comment-action-container">
          {submitLabel == "Reply" && (
            <span>to {toAnswer.map((obj) => obj.username)} </span>
          )}
          {hasCancelButton && (
            <span
              className="coment-form-button comment-form-cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </span>
          )}
        </div>
        <textarea
          placeholder="Your message"
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          disabled={isTextAreaDisabled}
          className={isTextAreaDisabled? "comment-form-button comment-form-button-disabled" :"comment-form-button"}
          onClick={onSubmit}
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
};
export default CommentForm;
