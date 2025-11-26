import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../store/postsSlice';

const PostCard = ({ post, onView, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      dispatch(deletePost(post.id));
    }
  };

  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}...</p>
      <div className="post-actions">
        <button onClick={() => onView(post.id)} className="btn btn-view">
          View Details
        </button>
        <button onClick={() => onEdit(post)} className="btn btn-edit">
          Edit
        </button>
        <button onClick={handleDelete} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;