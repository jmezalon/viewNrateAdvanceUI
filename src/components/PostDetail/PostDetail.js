import { Route, Routes } from "react-router-dom";
import { usePostDetail, selectUserOwnsPost } from "hooks/usePostDetail";
import { useAuthContext } from "contexts/auth";
import { useParams } from "react-router-dom";
import { Stars, PostDetailEdit, PostDetailView, NotFound } from "components";
import { formatRating, formatDate } from "../../utils/format";
import "./PostDetail.css";

export default function PostDetail() {
  const { postId } = useParams();
  const { user } = useAuthContext()
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
  } = usePostDetail(postId);

  const userOwnsPost = selectUserOwnsPost(user, post)

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
        <Routes>
          <Route
            path="/"
            element={
              <PostDetailView
                rating={rating}
                setRating={setRating}
                handleOnSaveRating={handleOnSaveRating}
                isSavingRating={isSavingRating}
                postId={postId}
                userOwnsPost={userOwnsPost}
              />
            }
          />
          <Route
            path="/edit"
            element={
              <PostDetailEdit
                caption={caption}
                setCaption={setCaption}
                isUpdating={isUpdating}
                handleOnUpdate={handleOnUpdate}
                userOwnsPost={userOwnsPost}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}
