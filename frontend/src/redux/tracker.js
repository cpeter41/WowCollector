import { csrfFetch } from "./csrf";

const GET_TRACKED_ACHVS = "tracker/getAchievements";
const ADD_TRACKED_ACHVS = "tracker/addAchievement";

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

export const getTrackedAchievements = (characterId) => async (dispatch) => {
    const res = await csrfFetch(`/api/characters/${characterId}/achievements`);

    let data;
    if (res.ok) data = await res.json();

    dispatch(getAchievements(data));
};

export const trackAchievement =
    (name, characterId, achievementId) => async (dispatch) => {
        const res = await csrfFetch(
            `/api/characters/${characterId}/achievements`,
            {
                method: "POST",
                body: JSON.stringify({ name, achvmntId: achievementId }),
            }
        );

        const data = await res.json();
        console.log(data);
        dispatch(addAchievement(data));
    };

const initState = { achievements: [], mounts: [] };

export default function trackerReducer(state = initState, action) {
    switch (action.type) {
        case GET_TRACKED_ACHVS:
            return { ...state, achievements: action.achievements };
        case ADD_TRACKED_ACHVS:
            return {
                ...state,
                achievements: [...state.achievements, action.achievement],
            };
        default:
            return state;
    }
}
