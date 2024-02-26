import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import postSlice from './slices/postSlices'
import userSlice from './slices/userSlice'
import errorSlice from './slices/globalErrorsSlice'

const combinedReducers = combineReducers({
  posts: postSlice,
  users: userSlice,
  errors: errorSlice
})

export const store = configureStore({
  reducer: combinedReducers,
})

export type RootState = ReturnType<typeof store.getState> //creates the type for the store
export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector