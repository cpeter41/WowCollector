import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAchievementDetails } from "../../redux/resources";
import { trackTitle, removeTrackedTitle } from "../../redux/tracker";
import renderCriteria from "./renderCriteria";
import "./Titles.css";

export default function TitleDetails() {
    const user = useSelector((state) => state.session.user);
    const character = useSelector((state) => state.characters.selCharacter);
    const title = useSelector((state) => state.resources.current_title);
    const trackedTitles = useSelector((state) => state.tracker.titles);
    const isTracked = trackedTitles.find((currTitle) => {
        return currTitle.blizzId == title.id;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // TODO: crosshair color effects on tracking status
    const handleCriteriaClick = () => {
        dispatch(
            getAchievementDetails(
                title.source.achievements[title.source.achievements.length - 1]
                    .id
            )
        );
        navigate("/achievements");
    };

    const handleTrackClick = () => {
        // track or untrack
        if (!isTracked)
            dispatch(
                trackTitle({
                    name: title.name,
                    characterId: character.id,
                    titleBlizzId: title.id,
                })
            );
        else
            dispatch(
                removeTrackedTitle({
                    characterId: character.id,
                    titleBlizzId: title.id,
                })
            );
    };

    return (
        <div id="title-details">
            {Object.keys(title).length > 0 && (
                <>
                    <div id="title-and-tracker">
                        <h1>{title.name}</h1>
                        {user && character && (
                            <div
                                id="track-button-container"
                                style={{ fontSize: "x-large" }}
                            >
                                <i
                                    className="fa-solid fa-crosshairs fa-2xl"
                                    style={{
                                        color: `${
                                            isTracked
                                                ? "lightcyan"
                                                : "rgb(110, 110, 110)"
                                        }`,
                                    }}
                                    onClick={handleTrackClick}
                                ></i>
                            </div>
                        )}
                    </div>
                    {renderCriteria(title, handleCriteriaClick)}
                </>
            )}
        </div>
    );
}