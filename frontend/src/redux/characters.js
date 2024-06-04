import { csrfFetch } from "./csrf";

const GET_CHARS = "characters/getCharactersOfUser";

const setCharacters = (chars) => {
    return {
        type: GET_CHARS,
        chars,
    };
};

export const getCharactersOfUser = () => async (dispatch) => {
    const res = await csrfFetch("/api/characters");

    let data;
    if (res.ok) data = await res.json(); 
    
    dispatch(setCharacters(data));
};

export const clearCharactersFromStore = () => async (dispatch) => {
    dispatch(setCharacters([]));
}

const initState = [];

export default function characterReducer(state = initState, action) {
    switch (action.type) {
        case GET_CHARS:
            return [...action.chars];
        default:
            return state;
    }
}
