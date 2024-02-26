import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../api/axiosConfig";
import { AxiosError } from "axios";

export interface UserState {
  data: User[];
  loading: boolean;
  error: string | null;
  me: User | null;
}

const initialState: UserState = {
  data: [],
  loading: true,
  error: null,
  me: null,
};

export const fetchUsers = createAsyncThunk(
  "users/get",
  (_, { rejectWithValue }): Promise<User[]> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res, rej) => {
      try {
        const resp = await httpClient.get("/user/suggestions");
        if (resp) res(resp.data);
      } catch (error) {
        const typedError = error as AxiosError;
        rej(rejectWithValue(typedError.response?.data as ErrorActionPayload));
      }
      //   if (resp.data) {
      //     const char = await resp.json();
      //     res(char);
      //   } else {
      //     const err = await resp.json();
      //     rej(rejectWithValue(err));
      //   }
    });
  }
);

export const fetchMe = createAsyncThunk(
  "users/me",
  (_, { rejectWithValue }): Promise<User> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (res, rej) => {
      try {
        const resp = await httpClient.get("/user/me");
        if (resp) res(resp.data);
      } catch (error) {
        rej(rejectWithValue("The error was caught by the axios interceptor!"));

        //   rej(rejectWithValue(error as ErrorActionPayload));
      }
      //   if (resp.data) {
      //     const char = await resp.json();
      //     res(char);
      //   } else {
      //     const err = await resp.json();
      //     rej(rejectWithValue(err));
      //   }
    });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setError: (state, action) => {
      return (state.error = action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log(action.payload);
      state.error = (action.payload as ErrorActionPayload).message;
    });
    builder.addCase(fetchMe.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(fetchMe.rejected, (state, action) => {
      console.log(action.payload);
      state.error = (action.payload as ErrorActionPayload).message;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {  } = postSlice.actions

export default userSlice.reducer;
