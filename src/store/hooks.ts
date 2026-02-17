import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState } from './rootReducer';
import { store } from '../store/index';

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
