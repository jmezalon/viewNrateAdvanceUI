import { useNewPostForm } from "hooks/useNewPostForm";
import { NotAllowed } from "components";
import { useAuthContext } from "contexts/auth";
import "./NewPostForm.css";

export default function NewPostForm() {
  const { user } = useAuthContext();
  const { form, error, handleOnInputChange, handleOnSubmit, isLoading } =
    useNewPostForm();

  const renderForm = () => {
    if (!user?.email) {
      return <NotAllowed />;
    }
    return (
      <div className="form">
        <div className="input-field">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            name="caption"
            placeholder="A cool caption here"
            value={form.caption}
            onChange={handleOnInputChange}
          />
        </div>

        <div className="input-field">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="The image URL for your workstation"
            value={form.imageUrl}
            onChange={handleOnInputChange}
          />
        </div>

        <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    );
  };

  return (
    <div className="NewPostForm">
      <div className="card">
        <h2>Create a new post</h2>

        {Boolean(error) && <span className="error">{error}</span>}

        {renderForm()}
      </div>
    </div>
  );
}
