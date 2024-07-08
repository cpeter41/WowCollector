import { csrfFetch } from "./csrf";

const GET_TRACKED_ACHVS = "tracker/getAchievements";
const ADD_TRACKED_ACHVS = "tracker/addAchievement";
const REMOVE_TRACKED_ACHV = "tracker/deleteAchievement";
const EDIT_ACHV_NOTE = "tracker/editAchievementNote";

const GET_TRACKED_MNTS = "tracker/getMounts";
const ADD_TRACKED_MNTS = "tracker/addMount";
const REMOVE_TRACKED_MNT = "tracker/deleteMount";
const EDIT_MNT_NOTE = "tracker/editMountNote";

const GET_TRACKED_TITLES = "tracker/getTitles";
const ADD_TRACKED_TITLES = "tracker/addTitle";
const REMOVE_TRACKED_TITLE = "tracker/deleteTitle";
const EDIT_TITLE_NOTE = "tracker/editTitleNote";

const getAchievements = (achievements) => {
    return {
        type: GET_TRACKED_ACHVS,
        achievements,
    };
};

const addAchievement = (achievement) => {
    return {
        type: ADD_TRACKED_ACHVS,
        achievement,
    };
};

const removeAchievement = (achievementId) => {
    return {
        type: REMOVE_TRACKED_ACHV,
        achievementId,
    };
};

const editAchNote = (achievementId, note) => {
    return {
        type: EDIT_ACHV_NOTE,
        achievementId,
        note,
    };
};

const getMounts = (mounts) => {
    return {
        type: GET_TRACKED_MNTS,
        mounts,
    };
};

const addMount = (mount) => {
    return {
        type: ADD_TRACKED_MNTS,
        mount,
    };
};

const removeMount = (mountId) => {
    return {
        type: REMOVE_TRACKED_MNT,
        mountId,
    };
};

const editMntNote = (mountId, note) => {
    return {
        type: EDIT_MNT_NOTE,
        mountId,
        note,
    };
};

const getTitles = (titles) => {
    return {
        type: GET_TRACKED_TITLES,
        titles,
    };
};

const addTitle = (title) => {
    return {
        type: ADD_TRACKED_TITLES,
        title,
    };
};

const removeTitle = (titleId) => {
    return {
        type: REMOVE_TRACKED_TITLE,
        titleId,
    };
};

const editTtlNote = (titleId, note) => {
    return {
        type: EDIT_TITLE_NOTE,
        titleId,
        note,
    };
};

export const getTrackedAchievements = (characterId) => async (dispatch) => {
    const res = await csrfFetch(`/api/characters/${characterId}/achievements`);

    let data;
    if (res.ok) data = await res.json();

    dispatch(getAchievements(data));
};

export const trackAchievement =
    ({ name, characterId, achievementId }) =>
    async (dispatch) => {
        const res = await csrfFetch(
            `/api/characters/${characterId}/achievements`,
            {
                method: "POST",
                body: JSON.stringify({ name, achvmntId: achievementId }),
            }
        );

        const data = await res.json();
        dispatch(addAchievement(data));
    };

export const removeTrackedAchievement =
    ({ characterId, achievementId }) =>
    async (dispatch) => {
        const res = await csrfFetch(
            `/api/characters/${characterId}/achievements/${achievementId}`,
            {
                method: "DELETE",
            }
        );

        if (res.ok) dispatch(removeAchievement(achievementId));
    };

export const editAchievementNote =
    ({ characterId, achievementId, note }) =>
    async (dispatch) => {
        const res = await csrfFetch(
            `/api/characters/${characterId}/achievements`,
            {
                method: "PUT",
                body: JSON.stringify({ note, achvmntId: achievementId }),
            }
        );

        if (res.ok) dispatch(editAchNote(achievementId, note));
    };

export const getTrackedMounts = (characterId) => async (dispatch) => {
    const res = await csrfFetch(`/api/characters/${characterId}/mounts`);

    let data;
    if (res.ok) data = await res.json();

    dispatch(getMounts(data));
};

export const trackMount =
    ({ name, characterId, mountId }) =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/characters/${characterId}/mounts`, {
            method: "POST",
            body: JSON.stringify({ name, mountId }),
        });

        const data = await res.json();
        dispatch(addMount(data));
    };

export const removeTrackedMount =
    ({ characterId, mountId }) =>
    async (dispatch) => {
        const res = await csrfFetch(
            `/api/characters/${characterId}/mounts/${mountId}`,
            {
                method: "DELETE",
            }
        );

        if (res.ok) dispatch(removeMount(mountId));
    };

export const editMountNote =
    ({ characterId, mountId, note }) =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/characters/${characterId}/mounts`, {
            method: "PUT",
            body: JSON.stringify({ note, mountId }),
        });

        if (res.ok) dispatch(editMntNote(mountId, note));
    };

export const getTrackedTitles = (characterId) => async (dispatch) => {
    const res = await csrfFetch(`/api/characters/${characterId}/titles`);
    
    let data;
    if (res.ok) data = await res.json();

    dispatch(getTitles(data));
};

export const trackTitle =
    ({ name, characterId, titleBlizzId }) =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/characters/${characterId}/titles`, {
            method: "POST",
            body: JSON.stringify({ name, titleBlizzId }),
        });

        const data = await res.json();
        dispatch(addTitle(data));
    };

export const removeTrackedTitle =
    ({ characterId, titleBlizzId }) =>
    async (dispatch) => {
        const res = await csrfFetch(
            `/api/characters/${characterId}/titles/${titleBlizzId}`,
            {
                method: "DELETE",
            }
        );

        if (res.ok) dispatch(removeTitle(titleBlizzId));
    };

export const editTitleNote =
    ({ characterId, titleId, note }) =>
    async (dispatch) => {
        const res = await csrfFetch(`/api/characters/${characterId}/titles`, {
            method: "PUT",
            body: JSON.stringify({ note, titleId }),
        });

        if (res.ok) dispatch(editTtlNote(titleId, note));
    };

export const clearTracker = () => async (dispatch) => {
    dispatch(getMounts([]));
    dispatch(getAchievements([]));
    dispatch(getTitles([]));
};

const initState = { achievements: [], mounts: [], titles: [] };

export default function trackerReducer(state = initState, action) {
    // i is for finding the index of the tracked item to delete
    // achieveToEdit is the achievement whos note is being edited
    let i, achieveToEdit, mountToEdit, titleToEdit;
    switch (action.type) {
        case GET_TRACKED_ACHVS:
            return { ...state, achievements: action.achievements };
        case ADD_TRACKED_ACHVS:
            return {
                ...state,
                achievements: [...state.achievements, action.achievement],
            };
        case REMOVE_TRACKED_ACHV:
            i = state.achievements.findIndex(
                (ach) => ach.blizzId == action.achievementId
            );
            return {
                ...state,
                achievements: state.achievements.toSpliced(i, 1),
            };
        case EDIT_ACHV_NOTE:
            achieveToEdit = state.achievements.find(
                (ach) => ach.blizzId == action.achievementId
            );
            achieveToEdit.note = action.note;
            return state;
        case GET_TRACKED_MNTS:
            return { ...state, mounts: action.mounts };
        case ADD_TRACKED_MNTS:
            return {
                ...state,
                mounts: [...state.mounts, action.mount],
            };
        case REMOVE_TRACKED_MNT:
            i = state.mounts.findIndex((mnt) => mnt.blizzId == action.mountId);
            return {
                ...state,
                mounts: state.mounts.toSpliced(i, 1),
            };
        case EDIT_MNT_NOTE:
            mountToEdit = state.mounts.find(
                (mnt) => mnt.blizzId == action.mountId
            );
            mountToEdit.note = action.note;
            return state;
        case GET_TRACKED_TITLES:
            return { ...state, titles: action.titles };
        case ADD_TRACKED_TITLES:
            return {
                ...state,
                titles: [...state.titles, action.title],
            };
        case REMOVE_TRACKED_TITLE:
            i = state.titles.findIndex(
                (currTitle) => currTitle.blizzId == action.titleId
            );
            return {
                ...state,
                titles: state.titles.toSpliced(i, 1),
            };
        case EDIT_TITLE_NOTE:
            titleToEdit = state.titles.find(
                (currTitle) => currTitle.blizzId == action.titleId
            );
            titleToEdit.note = action.note;
            return state;
        default:
            return state;
    }
}
