import { NewPostForm, Post } from 'components'
import { usePostContext } from 'contexts/posts';
import "./Home.css";

export default function Home() {
  const { isFetching, posts, error } = usePostContext()
  return (
    <div className="Home">
      <h1 className="intro">Rate My Setup</h1>

      <NewPostForm />

      <div className="feed">
        {error ? <h2 className="error">{error}</h2> : null}
        {isFetching ? <h2>Loading...</h2> : null}
        {posts?.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
