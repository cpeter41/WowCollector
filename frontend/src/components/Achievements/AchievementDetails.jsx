import { useSelector } from "react-redux";
import "./Achievements.css";

export default function AchievementDetails({ handleAchievementClick }) {
    const achievementDetails = useSelector(
        (state) => state.resources.current_achievement
    );

    // console.log(achievementDetails);

    return (
        <div id="achievement-details">
            <h2>{achievementDetails.name}</h2>
            <p>{achievementDetails.description}</p>
            <div id="criteria-container">
                {achievementDetails?.criteria?.child_criteria &&
                    achievementDetails.criteria.child_criteria.map((crta) => (
                        <div
                            key={crta.id}
                            id={crta?.achievement?.id}
                            className="criteria-achievement"
                            onClick={handleAchievementClick}
                        >
                            {crta.description}
                        </div>
                    ))}
            </div>
        </div>
    );
}
