import { useDispatch, useSelector } from "react-redux";
import { getAchievementDetails } from "../../redux/resources";
import "./Titles.css";
import { useNavigate } from "react-router-dom";

export default function TitleDetails() {
    const title = useSelector((state) => state.resources.current_title);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCriteriaClick = () => {
        dispatch(
            getAchievementDetails(
                title.source.achievements[title.source.achievements.length - 1]
                    .id
            )
        );
        navigate("/achievements");
    };

    return (
        <div id="title-details">
            <h1>{title.name}</h1>
            {title?.source ? (
                <div>
                    Source:{" "}
                    <button
                        className="title-criteria"
                        onClick={handleCriteriaClick}
                    >
                        {
                            title.source?.achievements[
                                title.source?.achievements.length - 1
                            ].name
                        }
                    </button>
                </div>
            ) : (
                <span>No source listed.</span>
            )}
        </div>
    );
}
