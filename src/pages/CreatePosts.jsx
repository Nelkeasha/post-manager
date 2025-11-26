import React from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../store/postsSlice';
import PostForm from '../components/PostForm';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (postData) => {
    dispatch(createPost(postData));
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="create-post">
      <h1>Create New Post</h1>
      <PostForm 
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CreatePost;