import { useDispatch, useSelector } from "react-redux";
import {
    getTrackedAchievements,
    removeTrackedAchievement,
} from "../../redux/tracker";
import EditTrackerModal from "../Modals/EditTrackerNoteModal";
import { getAchievementDetails } from "../../redux/resources";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./TrackerList.css";

export default function TrackerList({ setOpen }) {
    // TODO: close when clicking off of the menu
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent } = useModal();
    const selectedCharacter = useSelector(
        (state) => state.characters.selCharacter
    );

    const trackedAchievements = useSelector(
        (state) => state.tracker.achievements
    );
    const [achOpen, setAchOpen] = useState(true);

    const trackedMounts = useSelector((state) => state.tracker.mounts);
    const [mntOpen, setMntOpen] = useState(true);

    useEffect(() => {
        if (selectedCharacter) {
            document.cookie = `selCharacterId=${selectedCharacter.id};max-age=2629744`;
            dispatch(getTrackedAchievements(selectedCharacter.id));
        }
    }, [selectedCharacter, dispatch]);

    const handleDeleteAchievement = (e) => {
        if (trackedAchievements.find((ach) => ach.blizzId == e.target.id))
            dispatch(
                removeTrackedAchievement({
                    characterId: selectedCharacter.id,
                    achievementId: e.target.id,
                })
            );
    };

    const handleNoteAchievement = (e) => {
        // console.log(e.target);
        // const foundAchievement = document.getElementById(`t${e.target.id}`);
        const foundAchievement = trackedAchievements.find(
            (ach) => ach.blizzId == e.target.id
        );
        // console.log(foundAchievement);
        if (Object.keys(foundAchievement))
            setModalContent(
                <EditTrackerModal achievement={foundAchievement} />
            );
        const trackerBackground = document.getElementById("tracker-background");
        trackerBackground.style.zIndex = 0;
        // if (!foundAchievement?.classList.contains("editing")) {
        //     foundAchievement?.classList.add("editing");
        // } else {
        //     foundAchievement?.classList.remove("editing");
        // }
    };

    const handleAchievementNavigate = (e) => {
        dispatch(getAchievementDetails(e.target.id));
        navigate("/achievements");
        setOpen(false);
    };

    return (
        <>
            <div id="tracked-achievements-container">
                <div
                    className="tracker-list-section-header"
                    onClick={() => setAchOpen(!achOpen)}
                >
                    {achOpen ? (
                        <i className="fa-solid fa-angle-down fa-xl"></i>
                    ) : (
                        <i className="fa-solid fa-angle-up fa-xl"></i>
                    )}
                    <h2>Achievements ({trackedAchievements?.length})</h2>
                </div>
                <ul>
                    {achOpen &&
                        trackedAchievements &&
                        trackedAchievements.map((achv) => (
                            <li
                                className="tracked achievement"
                                key={achv.id}
                                id={`t${achv.blizzId}`}
                            >
                                <div className="tracker-button">
                                    <i className="fa-regular fa-circle-xmark fa-lg"></i>
                                    <i
                                        className="fa-solid fa-circle-xmark fa-lg"
                                        id={achv.blizzId}
                                        onClick={handleDeleteAchievement}
                                    ></i>
                                </div>
                                <div
                                    className="tracker-button"
                                    id="comment-button"
                                >
                                    <i className="fa-regular fa-comment fa-lg"></i>
                                    <i
                                        className="fa-solid fa-comment fa-lg"
                                        id={achv.blizzId}
                                        onClick={handleNoteAchievement}
                                    ></i>
                                </div>
                                <span
                                    id={achv.blizzId}
                                    onClick={handleAchievementNavigate}
                                >
                                    <h4>{achv.name}</h4>
                                    <div>
                                        {achv.note}
                                    </div>
                                </span>
                            </li>
                        ))}
                </ul>
            </div>
            <div id="tracked-mounts-container">
                <div
                    className="tracker-list-section-header"
                    onClick={() => setMntOpen(!mntOpen)}
                >
                    {mntOpen ? (
                        <i className="fa-solid fa-angle-down fa-xl"></i>
                    ) : (
                        <i className="fa-solid fa-angle-up fa-xl"></i>
                    )}
                    <h2>Mounts ({trackedMounts?.length})</h2>
                </div>
                <ul>
                    {mntOpen &&
                        trackedMounts &&
                        trackedMounts.map((mnt) => (
                            <li className="tracked mount" key={mnt.id}>
                                <div className="tracker-button">
                                    <i className="fa-regular fa-circle-xmark fa-lg"></i>
                                    <i className="fa-solid fa-circle-xmark fa-lg"></i>
                                </div>
                                <div className="tracker-button">
                                    <i className="fa-regular fa-comment fa-lg"></i>
                                    <i className="fa-solid fa-comment fa-lg"></i>
                                </div>
                                <span>{mnt.name}</span>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    );
}
