import { useDispatch, useSelector } from "react-redux";
import {
    getTrackedAchievements,
    removeTrackedAchievement,
    getTrackedMounts,
    removeTrackedMount,
} from "../../redux/tracker";
import EditTrackerModal from "../Modals/EditTrackerNoteModal";
import { getAchievementDetails, selectMount } from "../../redux/resources";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./TrackerList.css";

export default function TrackerList({ setOpen }) {
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
            dispatch(getTrackedMounts(selectedCharacter.id));
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

    const handleDeleteMount = (e) => {
        if (trackedMounts.find((mnt) => mnt.blizzId == e.target.id))
            dispatch(
                removeTrackedMount({
                    characterId: selectedCharacter.id,
                    mountId: e.target.id,
                })
            );
    };

    const handleNoteAchievement = (e) => {
        const foundAchievement = trackedAchievements.find(
            (ach) => ach.blizzId == e.target.id
        );
        if (Object.keys(foundAchievement))
            setModalContent(
                <EditTrackerModal achievement={foundAchievement} />
            );
        const trackerBackground = document.getElementById("tracker-background");
        trackerBackground.style.zIndex = 0;
    };

    const handleNoteMount = (e) => {
        const foundMount = trackedMounts.find(
            (mnt) => mnt.blizzId == e.target.id
        );
        if (Object.keys(foundMount))
            setModalContent(<EditTrackerModal mount={foundMount} />);
        const trackerBackground = document.getElementById("tracker-background");
        trackerBackground.style.zIndex = 0;
    };

    const handleAchievementNavigate = (e) => {
        dispatch(getAchievementDetails(e.target.id));
        navigate("/achievements");
        setOpen(false);
    };

    const handleMountNavigate = (e) => {
        console.log(e.target)
        dispatch(selectMount(e.target.id));
        navigate("/mounts");
        setOpen(false);
    };

    return (
        <div id="tracker-container">
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
                                {/* dont repeat ids. oh well... */}
                                <span
                                    id={achv.blizzId}
                                    onClick={handleAchievementNavigate}
                                >
                                    <h4 id={achv.blizzId}>{achv.name}</h4>
                                    <div id={achv.blizzId}>{achv.note}</div>
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
                            <li
                                className="tracked mount"
                                key={mnt.id}
                                id={`t${mnt.blizzId}`}
                            >
                                <div className="tracker-button">
                                    <i className="fa-regular fa-circle-xmark fa-lg"></i>
                                    <i
                                        className="fa-solid fa-circle-xmark fa-lg"
                                        id={mnt.blizzId}
                                        onClick={handleDeleteMount}
                                    ></i>
                                </div>
                                <div
                                    className="tracker-button"
                                    id="comment-button"
                                >
                                    <i className="fa-regular fa-comment fa-lg"></i>
                                    <i
                                        className="fa-solid fa-comment fa-lg"
                                        id={mnt.blizzId}
                                        onClick={handleNoteMount}
                                    ></i>
                                </div>
                                <span
                                    id={mnt.blizzId}
                                    onClick={handleMountNavigate}
                                >
                                    <h4 id={mnt.blizzId}>{mnt.name}</h4>
                                    <div id={mnt.blizzId}>{mnt.note}</div>
                                </span>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
