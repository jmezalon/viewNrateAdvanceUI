import { usePostDetail } from "hooks/usePostDetail";
import { useParams } from 'react-router-dom';
import { Stars, StarsInput } from "components";
import { formatRating, formatDate } from "../../utils/format";
import "./PostDetail.css";

export default function PostDetail() {
  const { postId} = useParams()
  const {
    handleOnSaveRating,
    handleOnUpdate,
    isSavingRating,
    error,
    post,
    rating,
    setRating,
    isFetching,
    isUpdating,
    caption,
    setCaption,
    userIsLoggedIn,
    userOwnsPost,
  } = usePostDetail(postId);

  if (!post && !isFetching) return null;
  if (!post) return <h1>Loading...</h1>;

  return (
    <div className="PostDetail">
      <div className="Post">
        <div
          className="media"
          style={{
            backgroundImage: `url(${post.imageUrl})`,
          }}
          to={`/posts/${post.id}`}
        />

        <div className="body">
          <div className="info">
            <p className="caption">{post.caption}</p>
            <span className="rating">
              <Stars rating={post.rating || 0} max={10} />
              {formatRating(post.rating || 0)}
            </span>
          </div>

          <div className="meta">
            <span className="date">{formatDate(post.createdAt)}</span>
            <span className="user">@{post.username}</span>
          </div>
        </div>
      </div>

      {error && <span className="error">Error: {error}</span>}

      <div className="actions">
        {userOwnsPost ? (
          <div className="edit-post">
            <p>Edit your post</p>
            <textarea
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              name="caption"
            ></textarea>
            <button className="btn" onClick={handleOnUpdate}>
              {isUpdating ? "Loading..." : "Save Post"}
            </button>
          </div>
        ) : (
          <div className="rate-setup">
            <p>Rate this setup</p>
            <StarsInput value={rating} setValue={setRating} max={10} />
            <button
              className="btn"
              onClick={handleOnSaveRating}
              disabled={!userIsLoggedIn}
            >
              {isSavingRating ? "Loading..." : "Save Rating"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
