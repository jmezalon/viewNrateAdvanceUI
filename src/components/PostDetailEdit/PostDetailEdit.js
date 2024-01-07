import { Forbidden } from "components";

export default function PostDetailEdit({
  caption,
  setCaption,
  isUpdating,
  handleOnUpdate,
  userOwnsPost,
}) {
  return (
    <div className="edit-post">
      {userOwnsPost ? (
        <>
          <p>Edit your post</p>
          <textarea
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            name="caption"
          ></textarea>
          <button className="btn" onClick={handleOnUpdate}>
            {isUpdating ? "Loading..." : "Save Post"}
          </button>
        </>
      ) : (
        <Forbidden message="You are not allowed to edit other user's post." />
      )}
    </div>
  );
}
