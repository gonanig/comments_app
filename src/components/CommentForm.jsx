import { useState } from "react";
import "../styles/comment.scss";
import faker from "faker";

const CommentForm = ({ handleSubmit, submitLabel, replyComment }) => {
  const [text, setText] = useState("");
  const isTextAreaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    if (submitLabel === "Send") {
      handleSubmit(text);
    } else {
      console.log("fsfs");
      replyComment(text);
    }

    setText("");
  };

  return (
    <div className="comment-form">
      {submitLabel !== "Reply" && (
        <div className="comment-image-container">
          <img src={faker.image.people()} alt="User Avatar " />
        </div>
      )}
      <form>
        <textarea
          placeholder="Your message"
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          disabled={isTextAreaDisabled}
          className="comment-form-button"
          onClick={onSubmit}
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
};
export default CommentForm;
