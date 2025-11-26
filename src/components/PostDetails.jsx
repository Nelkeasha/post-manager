import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, clearCurrentPost } from '../store/postsSlice';
import LoadingSpinner from './LoadingSpinner';

const PostDetails = ({ postId, onBack }) => {
  const dispatch = useDispatch();
  const { currentPost, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
    }
    return () => {
      dispatch(clearCurrentPost());
    };
  }, [dispatch, postId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">Error: {error}</div>;
  if (!currentPost) return <div>No post selected</div>;

  return (
    <div className="post-details">
      <button onClick={onBack} className="btn btn-back">
        Back to Posts
      </button>
      <div className="post-content">
        <h1>{currentPost.title}</h1>
        <p className="post-id">Post ID: {currentPost.id}</p>
        <p className="post-body">{currentPost.body}</p>
      </div>
    </div>
  );
};

export default PostDetails;