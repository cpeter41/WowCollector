import { useEffect, useState } from "react";
import { getMountList } from "../../redux/resources";
import { useDispatch, useSelector } from "react-redux";
import {
    selectMountCategory,
    selectMount,
    clearSelectedMount,
} from "../../redux/resources";
import { trackMount, removeTrackedMount } from "../../redux/tracker";
import "./Mounts.css";

export default function Mounts() {
    const user = useSelector((state) => state.session.user);
    const mounts = useSelector((state) => state.resources.mount_list);
    const selectedCategoryKey = useSelector(
        (state) => state.resources.current_mount_category
    );
    const selectedMount = useSelector((state) => state.resources.current_mount);
    const trackedMounts = useSelector((state) => state.tracker.mounts);
    const selectedCharacter = useSelector(
        (state) => state.characters.selCharacter
    );
    const dispatch = useDispatch();
    const [notes, setNotes] = useState();
    // const [mountArray, setArray] = useState([]);

    // on load component, if mount_list doesnt exist
    useEffect(() => {
        if (!Object.keys(mounts).length) dispatch(getMountList());
    });

    // load category if navigating from tracker (need to back populate)
    useEffect(() => {
        if (
            Object.keys(selectedMount).length &&
            selectedCategoryKey !== selectedMount.name[0]
        ) {
            dispatch(selectMountCategory(selectedMount.name[0]));
        }
    }, [selectedMount, dispatch, selectedCategoryKey]);

    // color crosshair button based on if mount is tracked or not
    useEffect(() => {
        const addButton = document.getElementById("track-button-container");
        // const detailNotes = document.getElementById("tracked-note");
        if (selectedMount && trackedMounts && addButton) {
            let note;
            const alreadyTracked = trackedMounts.find((mnt) => {
                if (mnt.blizzId == selectedMount.id) {
                    note = mnt.note;
                    return true;
                }
                // return ach.blizzId == achievementDetails.id
            });
            if (alreadyTracked) {
                if (note) setNotes(note);
                else setNotes();
                addButton.style.color = "lightcyan";
            } else {
                setNotes();
                addButton.style.color = "rgb(110, 110, 110)";
            }
        }
    }, [selectedMount, trackedMounts]);

    const handleCategoryClick = (e) => {
        let id;
        if (e.target.id.startsWith("h")) id = e.target.id.slice(1);
        else id = e.target.id;
        const mountCategory = document.getElementById(id);
        // swaps selected className
        if (!mountCategory.classList.contains("selected")) {
            // unselect mount from details when switching categories
            dispatch(clearSelectedMount());
            dispatch(selectMountCategory(e.target.id));
            const mountCategories = document.getElementById(
                "mount-category-container"
            );
            const oldSelectedCategory =
                mountCategories.getElementsByClassName("selected")[0];
            if (oldSelectedCategory)
                oldSelectedCategory.classList.remove("selected");
            mountCategory.classList.add("selected");
        }
    };

    const handleMountClick = (e) => {
        // be wary of e.target.id when more things are in the mount button
        const mount = document.getElementById(e.target.id);
        // swaps selected className
        if (!mount?.classList.contains("selected")) {
            dispatch(selectMount(e.target.id));
            const mountList = document.getElementById(
                "mounts-in-category-list"
            );
            const oldSelMount = mountList.getElementsByClassName("selected")[0];
            if (oldSelMount) oldSelMount.classList.remove("selected");
            mount.classList.add("selected");
        }
    };

    const handleTrackClick = () => {
        // track or untrack
        if (!trackedMounts.find((mnt) => mnt.blizzId == selectedMount.id))
            dispatch(
                trackMount({
                    name: selectedMount.name,
                    characterId: selectedCharacter.id,
                    mountId: selectedMount.id,
                })
            );
        else
            dispatch(
                removeTrackedMount({
                    characterId: selectedCharacter.id,
                    mountId: selectedMount.id,
                })
            );
    };

    return (
        <div id="mounts-container">
            <div id="mount-category-container">
                <div id="mounts-categories-header">
                    <h2>Mounts</h2>
                </div>
                {Object.keys(mounts).map((key) => {
                    // filter out the strange nonimplemented mounts ("[" category)
                    if (key !== "[")
                        return (
                            <div
                                className={`mount-category${
                                    key === selectedCategoryKey
                                        ? " selected"
                                        : ""
                                }`}
                                key={key}
                                id={key}
                                onClick={handleCategoryClick}
                            >
                                <h3 id={`h${key}`}>{key}</h3>
                            </div>
                        );
                })}
            </div>
            <div id="mounts-and-details-container">
                <div id="mount-details">
                    {Object.keys(selectedMount).length > 0 && (
                        <>
                            <div id="mount-title-and-button">
                                <h2>{selectedMount?.name}</h2>
                                {/* font size 'amplifier' div (xl + 2xl) */}
                                {user && selectedCharacter && (
                                    <div
                                        id="track-button-container"
                                        style={{ fontSize: "x-large" }}
                                    >
                                        <i
                                            className="fa-solid fa-crosshairs fa-2xl"
                                            onClick={handleTrackClick}
                                        ></i>
                                    </div>
                                )}
                                {notes && notes !== "" && (
                                    <div id="tracked-note">{notes}</div>
                                )}
                            </div>
                            <p>{selectedMount?.description}</p>
                            <p>Source: {selectedMount?.source?.name}</p>
                        </>
                    )}
                </div>
                <div id="mounts-in-category-list">
                    {mounts &&
                        mounts[selectedCategoryKey] &&
                        mounts[selectedCategoryKey].map((mount) => (
                            <div
                                className={`mount-item${
                                    mount.id === selectedMount.id
                                        ? " selected"
                                        : ""
                                }`}
                                id={mount.id}
                                key={mount.id}
                                onClick={handleMountClick}
                            >
                                {mount.name}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
