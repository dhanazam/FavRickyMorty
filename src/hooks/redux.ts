import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@state/store/configureStore";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*
useAppDispatch
- default Dispatch type does not know about thunks or other middleware
**/
