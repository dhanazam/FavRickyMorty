import { GetCharactersResponse } from "@api/api.types";
import { Character } from "@model/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TThunkAPI } from "@state/types";
import defaultInitialState from "@state/store/initialState"
import { RootState } from "@state/store/configureStore";

export const getCharacters = createAsyncThunk<
    GetCharactersResponse,
    { page: number},
    TThunkAPI
>("characters/get", async ({ page }, { extra: { apiService } }) => {
    
    const characters = await apiService.getCharacters({ page });
    console.log("characters", characters);
    return characters;
});

const extractData = (payload: GetCharactersResponse) => {
    return payload.results.map(({ id, name, image }) => {
        return {
            id,
            name,
            image
        }
    });
}

export interface CharactersState {
    characters: Character[];
    loading: boolean;
    page: number;
}

const initialState = defaultInitialState.characters as CharactersState;

export const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCharacters.pending, state => {
                state.loading = true;
            })
            .addCase(getCharacters.fulfilled, (state, action) => {
                state.page += 1;
                state.characters.push(...extractData(action.payload));
                state.loading = false
            })
            .addCase(getCharacters.rejected, state => {
                state.loading = false
            });
    }
});


export const selectCharacters = (state: RootState) => state.characters;

export const charactersReducer = charactersSlice.reducer;
