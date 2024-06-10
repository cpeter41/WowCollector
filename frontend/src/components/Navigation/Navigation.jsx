import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfileButton from "./ProfileButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import CharacterSelect from "./CharacterSelect";
import TrackerList from "../TrackerList";
import { getCharactersOfUser, selectCharacter } from "../../redux/characters";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const user = useSelector((state) => state.session.user);
    const characters = useSelector((state) => state.characters.characterList);
    const selectedCharacter = useSelector(
        (state) => state.characters.selCharacter
    );
    const trackedAchievementsLength = useSelector(
        (state) => state.tracker.achievements.length
    );
    const trackedMountsLength = useSelector(
        (state) => state.tracker.mounts.length
    );
    const [isOpen, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) dispatch(getCharactersOfUser());
    }, [dispatch, user]);

    // check cookie for last selected character
    useEffect(() => {
        const cookie = document.cookie;
        const cookieArray = cookie.split("; ");
        const selCharacterId = cookieArray
            .map((cookie) => cookie.split("="))
            .find((entry) => entry[0] == "selCharacterId");
        if (!selCharacterId) dispatch(selectCharacter(characters[0]));
        else if (characters?.length && !selectedCharacter) {
            const selChar = characters.find(
                (char) => char.id == selCharacterId[1]
            );
            dispatch(selectCharacter(selChar));
        }
    }, [characters, dispatch, selectedCharacter]);

    const handleTrackerExit = (e) => {
        if (e.target.id === "tracker-background") setOpen(false);
    };

    return (
        <div id="nav-bar">
            <NavLink to="/">
                <h1>WowCollector</h1>
            </NavLink>
            <CharacterSelect />
            <div id="nav-bar-middle">
                <NavLink to="/achievements">Achievements</NavLink>
                <NavLink to="/mounts">Mounts</NavLink>
            </div>
            {user && (
                <div id="open-tracker-button" onClick={() => setOpen(true)}>
                    <i className="fa-solid fa-crosshairs fa-2xl"></i>
                    <h2>({trackedAchievementsLength + trackedMountsLength})</h2>
                </div>
            )}
            <div
                id="tracker-background"
                className={`${isOpen ? "" : "hidden"}`}
                onClick={handleTrackerExit}
            >
                <div className={`tracker-menu${isOpen ? "" : " hidden"}`}>
                    <TrackerList setOpen={setOpen} />
                </div>
            </div>
            {isLoaded && user ? (
                <div id="nav-logged-out">
                    <ProfileButton user={user} />
                </div>
            ) : (
                <div id="nav-logged-in">
                    <OpenModalMenuItem
                        itemText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                    <OpenModalMenuItem
                        itemText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            )}
        </div>
    );
}

export default Navigation;
