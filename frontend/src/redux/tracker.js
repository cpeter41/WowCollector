import { csrfFetch } from "./csrf";

const GET_TRACKED_ACHVS = "tracker/getAchievements";
const ADD_TRACKED_ACHVS = "tracker/addAchievement";
const REMOVE_TRACKED_ACHV = "tracker/deleteAchievement";
const EDIT_NOTE = "tracker/editNote";

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

const editNote = (achievementId, note) => {
    return {
        type: EDIT_NOTE,
        achievementId,
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
        console.log("added", data)
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

        if (res.ok) dispatch(editNote(achievementId, note));
    };

const initState = { achievements: [], mounts: [] };

export default function trackerReducer(state = initState, action) {
    // i is for finding the index of the tracked item to delete
    // achieveToEdit is the achievement whos note is being edited
    let i, achieveToEdit;
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
        case EDIT_NOTE:
            achieveToEdit = state.achievements.find(
                (ach) => ach.blizzId == action.achievementId
            );
            achieveToEdit.note = action.note;
            return state;
        default:
            return state;
    }
}
