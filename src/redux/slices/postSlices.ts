import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface PostState {
  posts: Post[],
  loading: boolean
}

const initialState: PostState = {
  posts: [],
  loading: true
}

export const fetchPosts = createAsyncThunk("post/get", (payload, { rejectWithValue }): Promise<Post[]> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res, rej) => {
     const resp = await fetch(`http://localhost:3001/post`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("tumblr-token")
      }
     })
      if (resp.ok) {
        const char = await resp.json()
        res(char)
      } else {
        const err = await resp.json()
        rej(rejectWithValue(err))
      }
    })
  })

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
      builder.addCase(fetchPosts.pending, (state) => {
        state.loading = true
      })
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload
      })
  },
})

// Action creators are generated for each case reducer function
// export const {  } = postSlice.actions

export default postSlice.reducer