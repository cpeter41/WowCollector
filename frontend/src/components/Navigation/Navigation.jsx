import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProfileButton from "./ProfileButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import CharacterSelect from "./CharacterSelect";
import { getCharactersOfUser, selectCharacter } from "../../redux/characters";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const user = useSelector((state) => state.session.user);
    const characters = useSelector((state) => state.characters.characterList);
    const selectedCharacter = useSelector((state) => state.characters.selCharacter)
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) dispatch(getCharactersOfUser());
    }, [dispatch, user]);

    // TODO: currently picks first character in list to load
    // instead, store a cookie to use on load
    useEffect(() => {
        if (!selectedCharacter) dispatch(selectCharacter(characters[0]));
    }, [characters, dispatch, selectedCharacter])

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
            {isLoaded && user ? (
                <div id="nav-logged-out">
                    {/* <NavLink className="nav-link" to="/groups/new">
                        Start a new group
                    </NavLink> */}
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
