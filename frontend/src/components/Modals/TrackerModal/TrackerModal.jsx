import { useDispatch, useSelector } from "react-redux";
import { getTrackedAchievements } from "../../../redux/tracker";
// import { useModal } from "../../../context/Modal";
import { useEffect } from "react";

export default function TrackerModal() {
    const dispatch = useDispatch();
    // const { closeModal } = useModal();
    const selectedCharacter = useSelector(
        (state) => state.characters.selCharacter
    );
    const trackedAchievements = useSelector(
        (state) => state.tracker.achievements
    );

    useEffect(() => {
        if (selectedCharacter)
            return dispatch(getTrackedAchievements(selectedCharacter.id));
    });

    return (
        <div id="tracked-achievements-container">
            {trackedAchievements &&
                trackedAchievements.map((achv) => (
                    <div className="tracked-achievement">{achv.name}</div>
                ))}
        </div>
    );
}
