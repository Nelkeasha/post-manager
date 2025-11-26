import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API base URL
const API_URL = 'https://jsonplaceholder.typicode.com';

// Async thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  return response.json();
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
  const response = await fetch(`${API_URL}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    currentPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create Post
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post.id !== action.payload);
      });
  },
});

export const { clearCurrentPost } = postsSlice.actions;
export default postsSlice.reducer;