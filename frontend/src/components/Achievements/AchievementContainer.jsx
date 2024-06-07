import { useDispatch, useSelector } from "react-redux";
import { getAchievementDetails } from "../../redux/resources";
import AchievementDetails from "./AchievementDetails";
import "./Achievements.css";

export default function AchievementContainer() {
    // TODO: display selected achievement
    // TODO: highlight achievement if obtained by character
    // TODO: dont dispatch if achievement is already selected
    const dispatch = useDispatch();
    const current_subcategory = useSelector(
        (state) => state.resources.current_subcategory
    );

    const handleAchievementClick = (e) => {
        // console.log(e.target);
        const achievementList = document.getElementById(
            "achievement-list-container"
        );
        const oldSelectedAchievement =
        achievementList.getElementsByClassName("selected")[0];
        // console.log(oldSelectedAchievement);
        oldSelectedAchievement?.classList?.remove("selected");
        e.target.classList.add("selected");
        dispatch(getAchievementDetails(e.target.id));
    };

    return (
        <div id="achievement-list-and-details-container">
            <div id="achievement-details-container">
                <AchievementDetails
                    handleAchievementClick={handleAchievementClick}
                />
            </div>
            <div id="achievement-list-wrapper">
                <div id="achievement-list-container">
                    {current_subcategory?.achievements_in_category?.map(
                        (ach) => (
                            <div
                                className="achievement-button"
                                key={ach.id}
                                id={ach.id}
                                onClick={handleAchievementClick}
                            >
                                {ach.name}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
