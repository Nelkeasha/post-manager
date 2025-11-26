import React, { useState } from 'react';

const PostForm = ({ post, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [body, setBody] = useState(post?.body || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      const postData = post 
        ? { id: post.id, title, body, userId: post.userId || 1 }
        : { title, body, userId: 1 };
      
      onSubmit(postData);
      if (!post) {
        setTitle('');
        setBody('');
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{post ? 'Edit Post' : 'Create New Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows="5"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {post ? 'Update' : 'Create'} Post
            </button>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;