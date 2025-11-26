import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, createPost, updatePost } from '../store/postsSlice';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import PostDetails from '../components/PostDetails';
import LoadingSpinner from '../components/LoadingSpinner';

const PostsList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.posts);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleCreateSubmit = async (postData) => {
    try {
      await dispatch(createPost(postData)).unwrap();
      setShowCreateForm(false);
      setSuccessMessage('Post created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleEditSubmit = async (postData) => {
    try {
      await dispatch(updatePost(postData)).unwrap();
      setEditingPost(null);
      setSuccessMessage('Post updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleViewDetails = (id) => {
    setSelectedPostId(id);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
  };

  const handleCreate = () => {
    setShowCreateForm(true);
  };

  const handleFormCancel = () => {
    setEditingPost(null);
    setShowCreateForm(false);
  };

  if (selectedPostId) {
    return (
      <PostDetails 
        postId={selectedPostId} 
        onBack={() => setSelectedPostId(null)} 
      />
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1>Posts Manager</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          Create New Post
        </button>
      </div>

      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      {showCreateForm && (
        <PostForm 
          onSubmit={handleCreateSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {editingPost && (
        <PostForm 
          post={editingPost}
          onSubmit={handleEditSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {loading && <LoadingSpinner />}
      
      {error && (
        <div className="error">
          Error loading posts: {error}
          <button onClick={() => dispatch(fetchPosts())} className="btn btn-retry">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="posts-grid">
          {items.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onView={handleViewDetails}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsList;