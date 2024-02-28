import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import httpClient from '../../api/axiosConfig'

export interface PostState {
  data: Post[],
  loading: boolean
  error: string | null
}

const initialState: PostState = {
  data: [],
  loading: true,
  error: null
}

export const fetchPosts = createAsyncThunk("post/get", (payload, { rejectWithValue }): Promise<Post[]> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res, rej) => {
      try {
        
        const resp = await httpClient.get("/post/dashboard")
        if (resp) res(resp.data);
      } catch (error) {
        rej(rejectWithValue("The error was caught by the axios interceptor!"));
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
        state.data = action.payload
        state.loading = false
      })
      builder.addCase(fetchPosts.rejected, (state, action) => {
        console.log(action.payload)
        state.error = (action.payload as ErrorActionPayload).message;
        state.loading = false
      });
  },
})

// Action creators are generated for each case reducer function
// export const {  } = postSlice.actions

export default postSlice.reducer