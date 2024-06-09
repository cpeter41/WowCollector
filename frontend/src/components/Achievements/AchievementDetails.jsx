import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    trackAchievement,
    removeTrackedAchievement,
} from "../../redux/tracker";
import { getSubCategoryDetails } from "../../redux/resources";
import "./Achievements.css";

export default function AchievementDetails({ handleAchievementClick }) {
    const dispatch = useDispatch();
    const achievementDetails = useSelector(
        (state) => state.resources.current_achievement
    );
    const selectedCharacter = useSelector(
        (state) => state.characters.selCharacter
    );
    const trackedAchievements = useSelector(
        (state) => state.tracker.achievements
    );

    useEffect(() => {
        if (achievementDetails.category)
            dispatch(getSubCategoryDetails(achievementDetails.category?.id));
    }, [achievementDetails, dispatch]);

    // color crosshair button based on if achievement is tracked or not
    useEffect(() => {
        const addButton = document.getElementById("track-button-container");
        if (achievementDetails && trackedAchievements && addButton) {
            const alreadyTracked = trackedAchievements.find(
                (ach) => ach.blizzId == achievementDetails.id
            );
            if (alreadyTracked) addButton.style.color = "black";
            else addButton.style.color = "lightgray";
        }
    }, [achievementDetails, trackedAchievements]);

    const handleTrackClick = () => {
        // dont track if achievement is already tracked
        if (
            !trackedAchievements.find((ach) => {
                return ach.blizzId == achievementDetails.id;
            })
        )
            dispatch(
                trackAchievement({
                    name: achievementDetails.name,
                    characterId: selectedCharacter.id,
                    achievementId: achievementDetails.id,
                })
            );
        else
            dispatch(
                removeTrackedAchievement({
                    characterId: selectedCharacter.id,
                    achievementId: achievementDetails.id,
                })
            );
    };

    return (
        <div id="achievement-details">
            {/* check if achievement is selected before rendering anything */}
            {Object.keys(achievementDetails).length > 0 && (
                <>
                    <div id="achievement-title-and-button">
                        <h2>{achievementDetails?.name}</h2>
                        {/* font size 'amplifier' div (xl + 2xl) */}
                        <div
                            id="track-button-container"
                            style={{ fontSize: "x-large" }}
                        >
                            <i
                                className="fa-solid fa-crosshairs fa-2xl"
                                onClick={handleTrackClick}
                            ></i>
                        </div>
                    </div>
                    <p>{achievementDetails?.description}</p>
                    {/**
                     * Criteria are the specified requirements for an achievement to
                     * be completed. Not all achievements have criteria!
                     * */}
                    <div id="criteria-container">
                        {achievementDetails?.criteria?.child_criteria?.map(
                            (crta) => {
                                // return a clickable item if criterion is an achievement
                                if (crta.achievement)
                                    return (
                                        <div
                                            key={crta.id}
                                            id={crta?.achievement?.id}
                                            className="criteria-achievement"
                                            onClick={(e) => {
                                                // unselect old subcategory
                                                const lastSelectedSubcat =
                                                    document
                                                        .getElementById(
                                                            "category-details-subcategories"
                                                        )
                                                        .getElementsByClassName(
                                                            "selected"
                                                        )[0];
                                                lastSelectedSubcat.classList.remove(
                                                    "selected"
                                                );
                                                // display new achievement in details section
                                                handleAchievementClick(e);
                                            }}
                                        >
                                            {crta.description}
                                        </div>
                                    );
                                /**
                                 * if criteria are NOT achievements, then don't add onClick
                                 * e.g. "Draconically Epic (id 18977) has criteria for every
                                 * item slot, but none of these are achievements. We remove
                                 * the onclick to prevent trying to load an achievement that
                                 * doesn't exist.
                                 */ else
                                    return (
                                        <div
                                            key={crta.id}
                                            id={crta?.achievement?.id}
                                            // different class to avoid hover effects
                                            className="criteria-part"
                                        >
                                            {crta.description}
                                        </div>
                                    );
                            }
                        )}
                    </div>
                </>
            )}
        </div>
    );
}