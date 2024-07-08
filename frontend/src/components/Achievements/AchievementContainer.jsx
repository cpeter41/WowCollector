import { useDispatch, useSelector } from "react-redux";
import { getAchievementDetails } from "../../redux/resources";
import AchievementDetails from "./AchievementDetails";
import "./Achievements.css";

export default function AchievementContainer() {
    const dispatch = useDispatch();
    const current_subcategory = useSelector(
        (state) => state.resources.current_subcategory
    );
    const selectedAchievement = useSelector((state) => state.resources.current_achievement);

    const handleAchievementClick = (e) => {
        if (!e.target.classList.contains("selected")) {
            const achievementList = document.getElementById(
                "achievement-list-container"
            );
            const oldSelectedAchievement =
                achievementList.getElementsByClassName("selected")[0];
            if (oldSelectedAchievement !== e.target) {
                oldSelectedAchievement?.classList?.remove("selected");
                achievementList.getElementById
                e.target.classList.add("selected");
                dispatch(getAchievementDetails(e.target.id));
            }

        }
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
                                className={`achievement-button${selectedAchievement.id == ach.id ? " selected" : ""}`}
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
