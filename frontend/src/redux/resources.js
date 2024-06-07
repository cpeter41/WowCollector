import { useSelector } from "react-redux";
import { csrfFetch } from "./csrf";

const GET_CATEGORIES = "resources/getAchievementCategories";
const GET_CATEGORY_DETAILS = "resources/getCategoryDetails";
const GET_SUBCAT_DETAILS = "resources/getSubcategoryDetails";

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

const getSubCatDeets = (details) => {
    return {
        type: GET_SUBCAT_DETAILS,
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

export const getSubCategoryDetails = (categoryId) => async (dispatch) => {
    // same api call as above, just puts it in a different part of store
    const res = await csrfFetch(
        `/api/resources/achievements/categories/${categoryId}`
    );

    let data;
    if (res.ok) data = await res.json();

    dispatch(getSubCatDeets(data));
};

export const getGlobalSubcategoryDetails = () => async (dispatch) => {
    const current_category = useSelector(
        (state) => state.resources.current_category
    );
    console.log(current_category);
    dispatch(getSubCatDeets(current_category));
};

const initState = {
    achievement_categories: [],
    current_category: {},
    current_subcategory: {},
};

export default function resourcesReducer(state = initState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return { ...state, achievement_categories: action.categories };
        case GET_CATEGORY_DETAILS:
            return { ...state, current_category: action.details };
        case GET_SUBCAT_DETAILS:
            return { ...state, current_subcategory: action.details };
        default:
            return state;
    }
}
