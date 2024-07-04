import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useState } from "react";
import {
    editAchievementNote,
    editMountNote,
    editTitleNote,
} from "../../../redux/tracker";
import "./EditTrackerModal.css";

export default function EditTrackerModal({ achievement, mount, title }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [note, setNote] = useState(
        achievement?.note || mount?.note || title?.note
    );
    const character = useSelector((state) => state.characters.selCharacter);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trackerBackground = document.getElementById("tracker-background");
        trackerBackground.style.zIndex = 1;
        if (achievement) {
            if (character?.id && achievement?.blizzId)
                return dispatch(
                    editAchievementNote({
                        characterId: character.id,
                        achievementId: achievement.blizzId,
                        note,
                    })
                ).then(closeModal);
        } else if (mount) {
            if (character?.id && mount?.blizzId)
                return dispatch(
                    editMountNote({
                        characterId: character.id,
                        mountId: mount.blizzId,
                        note,
                    })
                ).then(closeModal);
        } else if (title) {
            if (character?.id && title?.blizzId)
                return dispatch(
                    editTitleNote({
                        characterId: character.id,
                        titleId: title.blizzId,
                        note,
                    })
                ).then(closeModal);
        }
    };

    return (
        <div id="edit-note-container">
            <h2>{achievement?.name}</h2>
            <form id="edit-note-form" onSubmit={handleSubmit}>
                <label>Note Contents:</label>
                <textarea
                    // type="textarea"
                    value={note}
                    rows={4}
                    onChange={(e) => setNote(e.target.value)}
                ></textarea>

                <button id="edit-note-submit" type="submit">
                    Edit Note
                </button>
            </form>
        </div>
    );
}
