import { csrfFetch } from "./csrf";

const GET_CHARS = "characters/getCharactersOfUser";
const SEL_CHAR = "characters/selectCharacter";
const ADD_CHAR = "characters/addCharacter";
const DEL_CHAR = "characters/deleteCharacter";

const setCharacters = (chars) => {
    return {
        type: GET_CHARS,
        chars,
    };
};

const selChar = (char) => {
    return {
        type: SEL_CHAR,
        char,
    };
};

const addChar = (char) => {
    return {
        type: ADD_CHAR,
        char,
    };
};

const delChar = (charId) => {
    return {
        type: DEL_CHAR,
        charId,
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
};

export const selectCharacter = (char) => async (dispatch) => {
    dispatch(selChar(char));
};

export const addCharacter = (char) => async (dispatch) => {
    const res = await csrfFetch("/api/characters", {
        method: "POST",
        body: JSON.stringify(char),
    });
    const data = await res.json();
    dispatch(addChar(data));
};

export const deleteCharacter = (charId) => async (dispatch) => {
    const res = await csrfFetch(`/api/characters/${charId}`, {
        method: "DELETE",
    });

    if (res.ok) dispatch(delChar(charId));
};

const initState = { characterList: [], selCharacter: null };

export default function characterReducer(state = initState, action) {
    // i is for finding the index of the character to delete
    let i;
    switch (action.type) {
        case GET_CHARS:
            return { ...state, characterList: [...action.chars] };
        case SEL_CHAR:
            return { ...state, selCharacter: action.char };
        case ADD_CHAR:
            return {
                ...state,
                characterList: [...state.characterList, action.char],
            };
        case DEL_CHAR:
            i = state.characterList.findIndex(
                (char) => char.id == action.charId
            );
            return {
                ...state,
                characterList: state.characterList.toSpliced(i, 1),
                selCharacter: null,
            };
        default:
            return state;
    }
}
