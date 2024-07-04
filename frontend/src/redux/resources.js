import { csrfFetch } from "./csrf";

const GET_CATEGORIES = "resources/setAchievementCategories";
const GET_CATEGORY_DETAILS = "resources/getCategoryDetails";
const GET_SUBCAT_DETAILS = "resources/getSubcategoryDetails";
const GET_ACHVMNT_DETAILS = "resources/getAchievementDetails";

const GET_MOUNT_LIST = "resources/getMountList";
const SEL_MOUNT_CAT = "resources/selectMountCategory";
const SEL_MOUNT = "resources/selectMount";

const GET_TITLE_LIST = "resources/getTitleList";
const SEL_TITLE_CAT = "resources/selectTitleCategory";
const SEL_TITLE = "resources/selectTitle";

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

const getMountCategoryDetails = (key) => {
    return {
        type: SEL_MOUNT_CAT,
        key,
    };
};

const getMountDetails = (mount) => {
    return {
        type: SEL_MOUNT,
        mount,
    };
};

const getTitles = (titles) => {
    return {
        type: GET_TITLE_LIST,
        titles,
    };
};

const getTitleCategoryDetails = (key) => {
    return {
        type: SEL_TITLE_CAT,
        key,
    };
};

const getTitleDetails = (title) => {
    return {
        type: SEL_TITLE,
        title,
    };
};

// Import these functions
// -- Achievements

export const setAchievementCategories = () => async (dispatch) => {
    const res = await csrfFetch("/api/resources/achievements/categories");

    let data;
    if (res.ok) data = await res.json();

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

// -- Mounts

export const getMountList = () => async (dispatch) => {
    const res = await csrfFetch("/api/resources/mounts");

    let data;
    if (res.ok) data = await res.json();
    dispatch(getMounts(data));
};

export const selectMountCategory = (key) => async (dispatch) => {
    dispatch(getMountCategoryDetails(key));
};

export const selectMount = (mountId) => async (dispatch) => {
    const res = await csrfFetch(`/api/resources/mounts/${mountId}`);
    let data;
    if (res.ok) data = await res.json();

    dispatch(getMountDetails(data));
};

export const clearSelectedMount = () => async (dispatch) => {
    dispatch(getMountDetails({}));
};

// -- Titles

export const getTitleList = () => async (dispatch) => {
    const res = await csrfFetch("/api/resources/titles");

    let data;
    if (res.ok) data = await res.json();
    dispatch(getTitles(data));
};

export const selectTitleCategory = (key) => async (dispatch) => {
    dispatch(getTitleCategoryDetails(key));
};

export const selectTitle = (title) => async (dispatch) => {
    const res = await csrfFetch(`/api/resources/titles/${title.id}`);
    let data;
    if (res.ok) data = await res.json();

    dispatch(getTitleDetails(data));
};

export const clearSelectedTitle = () => async (dispatch) => {
    dispatch(getTitleDetails({}));
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
    // list of mounts, alphabetized
    mount_list: {},
    // current selected mount category (first letter)
    current_mount_category: "",
    // current selected mount
    current_mount: {},
    // list of titles, alphabetized
    title_list: {},
    // current selected title category (first letter, skipping "the")
    current_title_category: "",
    // current selected title
    current_title: {},
};

export default function resourcesReducer(state = initState, action) {
    // consider refactoring this into separate store slices
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
        case SEL_MOUNT_CAT:
            return { ...state, current_mount_category: action.key };
        case SEL_MOUNT:
            return { ...state, current_mount: action.mount };
        case GET_TITLE_LIST:
            return { ...state, title_list: action.titles };
        case SEL_TITLE_CAT:
            return { ...state, current_title_category: action.key };
        case SEL_TITLE:
            return { ...state, current_title: action.title };
        default:
            return state;
    }
}
