import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    trackAchievement,
    removeTrackedAchievement,
} from "../../redux/tracker";
import {
    getCategoryDetails,
    getSubCategoryDetails,
} from "../../redux/resources";
import "./Achievements.css";
// import { useParams } from "react-router-dom";

export default function AchievementDetails({ handleAchievementClick }) {
    const dispatch = useDispatch();
    // let { categoryId } = useParams();
    const user = useSelector((state) => state.session.user);
    const achievementDetails = useSelector(
        (state) => state.resources.current_achievement
    );
    const selectedCharacter = useSelector(
        (state) => state.characters.selCharacter
    );
    const trackedAchievements = useSelector(
        (state) => state.tracker.achievements
    );
    const rootCategories = useSelector(
        (state) => state.resources.achievement_categories
    );
    const [notes, setNotes] = useState();

    // loads proper categories and subcategories when navigating achievements
    useEffect(() => {
        if (rootCategories.length && achievementDetails?.category) {
            const isRootCategory = rootCategories.find(
                (cat) => cat.id == achievementDetails?.category?.id
            );
            if (isRootCategory) {
                dispatch(getCategoryDetails(achievementDetails.category?.id));
            } else {
                const rootCat = rootCategories.find((rootCat) => {
                    return rootCat.subcategories?.find(
                        (subCat) =>
                            subCat.id == achievementDetails?.category?.id
                    );
                });
                dispatch(getCategoryDetails(rootCat.id));
            }
            dispatch(getSubCategoryDetails(achievementDetails.category?.id));
        }
    }, [achievementDetails, dispatch, rootCategories]);

    // color crosshair button based on if achievement is tracked or not
    useEffect(() => {
        const addButton = document.getElementById("track-button-container");
        // const detailNotes = document.getElementById("tracked-note");
        if (achievementDetails && trackedAchievements && addButton) {
            let note;
            const alreadyTracked = trackedAchievements.find((ach) => {
                if (ach.blizzId == achievementDetails.id) {
                    note = ach.note;
                    return true;
                }
                // return ach.blizzId == achievementDetails.id
            });
            if (alreadyTracked) {
                if (note) setNotes(note);
                else setNotes();
                addButton.style.color = "lightcyan";
            } else {
                setNotes();
                addButton.style.color = "rgb(110, 110, 110)";
            }
        }
    }, [achievementDetails, trackedAchievements]);

    const handleTrackClick = () => {
        // track or untrack
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
                        {user && selectedCharacter && (
                            <div
                                id="track-button-container"
                                style={{ fontSize: "x-large" }}
                            >
                                <i
                                    className="fa-solid fa-crosshairs fa-2xl"
                                    onClick={handleTrackClick}
                                ></i>
                            </div>
                        )}
                        {notes && notes !== "" && (
                            <div id="tracked-note">{notes}</div>
                        )}
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
                                                lastSelectedSubcat?.classList.remove(
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
                                 */ else if (crta.child_criteria)
                                    return (
                                        <div
                                            key={crta.id}
                                            id={
                                                crta?.child_criteria[0]
                                                    .achievement?.id
                                            }
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
                                                lastSelectedSubcat?.classList.remove(
                                                    "selected"
                                                );
                                                // display new achievement in details section
                                                handleAchievementClick(e);
                                            }}
                                        >
                                            {crta.child_criteria[0].description}
                                        </div>
                                    );
                                // else
                                //     return (
                                //         <div
                                //             key={crta.id}
                                //             id={crta.id}
                                //             // different class to avoid hover effects
                                //             className="criteria-part"
                                //         >
                                //             {crta.description}
                                //         </div>
                                //     );
                            }
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
