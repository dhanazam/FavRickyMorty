import { Api } from "@api/api";
import { AppDispatch, RootState } from "../store/configureStore";

export type TThunkAPI = {
    dispatch: AppDispatch;
    extra: {
        apiService: Api;
    };
};

export type User = {
    displayName: any;
    email: string;
};
