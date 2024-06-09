import { csrfFetch } from "./csrf";

const GET_TRACKED_ACHVS = "tracker/getAchievements";
const ADD_TRACKED_ACHVS = "tracker/addAchievement";
const REMOVE_TRACKED_ACHV = "tracker/deleteAchievement";

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

const initState = { achievements: [], mounts: [] };

export default function trackerReducer(state = initState, action) {
    // i is for finding the index of the tracked item to delete
    let i;
    switch (action.type) {
        case GET_TRACKED_ACHVS:
            return { ...state, achievements: action.achievements };
        case ADD_TRACKED_ACHVS:
            return {
                ...state,
                achievements: [...state.achievements, action.achievement],
            };
        case REMOVE_TRACKED_ACHV:
            i = state.achievements.findIndex((ach) => {
                return ach.blizzId == action.achievementId;
            });
            return {
                ...state,
                achievements: state.achievements.toSpliced(i, 1),
            };
        default:
            return state;
    }
}
