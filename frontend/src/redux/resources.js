import { csrfFetch } from "./csrf";

const GET_CATEGORIES = "resources/setAchievementCategories";
const GET_CATEGORY_DETAILS = "resources/getCategoryDetails";
const GET_SUBCAT_DETAILS = "resources/getSubcategoryDetails";
const GET_ACHVMNT_DETAILS = "resources/getAchievementDetails";

const GET_MOUNT_LIST = "resources/getMountList";

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

const getAchvmntDetails = (details) => {
    return {
        type: GET_ACHVMNT_DETAILS,
        details,
    };
};

const getMounts = (mounts) => {
    return {
        type: GET_MOUNT_LIST,
        mounts,
    };
};

export const setAchievementCategories = (data) => async (dispatch) => {
    // const res = await csrfFetch("/api/resources/achievements/categories");

    // let data;
    // if (res.ok) data = await res.json();

    dispatch(getCategories(data));
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

export const getAchievementDetails = (achievementId) => async (dispatch) => {
    const res = await csrfFetch(`/api/resources/achievements/${achievementId}`);

    let data;
    if (res.ok) data = await res.json();

    dispatch(getAchvmntDetails(data));
};

export const clearSelections = () => async (dispatch) => {
    dispatch(getAchvmntDetails({}));
    dispatch(getSubCatDeets({}));
    dispatch(getCatDeets({}));
};

export const clearAchievementSelection = () => async (dispatch) => {
    dispatch(getAchvmntDetails({}));
};

export const getMountList = () => async (dispatch) => {
    const res = await csrfFetch("/api/resources/mounts");
    
    let data;
    if (res.ok) data = await res.json();

    dispatch(getMounts(data));
};

const initState = {
    // root categories of achievements for base "/achievements" page
    achievement_categories: [],
    // selected category for modified "/achievements" page (shows subcategories)
    current_category: {},
    // selected subcategory for achievements list on modified "/achievements" page
    current_subcategory: {},
    // selected achievement for full details on modified page ^
    current_achievement: {},
    // entire list of mounts (HUGE)
    mount_list: []
};

export default function resourcesReducer(state = initState, action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return { ...state, achievement_categories: action.categories };
        case GET_CATEGORY_DETAILS:
            return { ...state, current_category: action.details };
        case GET_SUBCAT_DETAILS:
            return { ...state, current_subcategory: action.details };
        case GET_ACHVMNT_DETAILS:
            return { ...state, current_achievement: action.details };
        case GET_MOUNT_LIST:
            return { ...state, mount_list: action.mounts };
        default:
            return state;
    }
}
