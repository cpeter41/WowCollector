import { csrfFetch } from "./csrf";

const GET_CATEGORIES = "resources/getAchievementCategories";
const GET_CATEGORY_DETAILS = "resources/getCategoryDetails";

const getCategories = (categories) => {
    return {
        type: GET_CATEGORIES,
        categories,
    };
};

const getCatDeets = (details) => {
    return {
        type: GET_CATEGORY_DETAILS,
        details,
    };
};

export const getAchievementCategories = () => async (dispatch) => {
    const res = await csrfFetch("/api/resources/achievements/categories");

    let data;
    if (res.ok) data = await res.json();

    dispatch(getCategories(data.root_categories));
};

export const getCategoryDetails = (categoryId) => async (dispatch) => {
    const res = await csrfFetch(
        `/api/resources/achievements/categories/${categoryId}`
    );

    let data;
    if (res.ok) data = await res.json();

    dispatch(getCatDeets(data));
};

const initState = { achievement_categories: [], current_category: {} };

export default function resourcesReducer(state = initState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return { ...state, achievement_categories: action.categories };
        case GET_CATEGORY_DETAILS:
            return { ...state, current_category: action.details };
        default:
            return state;
    }
}
