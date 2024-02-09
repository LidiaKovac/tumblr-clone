import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { postSlice } from './slices/postSlices'

export const store = configureStore({
  reducer: postSlice.reducer,
})

export type RootState = ReturnType<typeof store.getState> //creates the type for the store
export type AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector