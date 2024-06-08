import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { trackAchievement } from "../../redux/tracker";
import { getSubCategoryDetails } from "../../redux/resources";
import "./Achievements.css";

export default function AchievementDetails({ handleAchievementClick }) {
    const dispatch = useDispatch();
    const achievementDetails = useSelector(
        (state) => state.resources.current_achievement
    );

    useEffect(() => {
        if (achievementDetails.category)
            dispatch(getSubCategoryDetails(achievementDetails.category?.id));
    }, [achievementDetails, dispatch]);

    return (
        <div id="achievement-details">
            <h2>{achievementDetails?.name}</h2>
            <p>{achievementDetails?.description}</p>
            <div id="criteria-container">
                {achievementDetails?.criteria?.child_criteria?.map((crta) => (
                    <div
                        key={crta.id}
                        id={crta?.achievement?.id}
                        className="criteria-achievement"
                        onClick={(e) => {
                            // unselect old subcategory
                            const lastSelectedSubcat = document
                                .getElementById(
                                    "category-details-subcategories"
                                )
                                .getElementsByClassName("selected")[0];
                            lastSelectedSubcat.classList.remove("selected");
                            // display new achievement in details section
                            handleAchievementClick(e);
                        }}
                    >
                        {crta.description}
                    </div>
                ))}
            </div>
        </div>
    );
}
