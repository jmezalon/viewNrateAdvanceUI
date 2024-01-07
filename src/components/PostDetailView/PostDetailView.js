import { StarsInput } from "components";
import { Link } from "react-router-dom";

export default function PostDetailView({
  rating,
  setRating,
  handleOnSaveRating,
  isSavingRating,
  userOwnsPost,
  postId,
}) {
  return (
    <div className="rate-setup">
      {userOwnsPost ? (
        <>
          <p>Update your post</p>
          <Link to={`/posts/${postId}/edit`}>
            <button className="btn">Edit</button>
          </Link>
        </>
      ) : (
        <>
          <p>Rate this setup</p>
          <StarsInput value={rating} setValue={setRating} max={10} />
          <button
            className="btn"
            onClick={handleOnSaveRating}
            disabled={isSavingRating}
          >
            {isSavingRating ? "Loading..." : "Save Rating"}
          </button>
        </>
      )}
    </div>
  );
}
