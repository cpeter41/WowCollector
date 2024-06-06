import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import CharacterSelect from "./CharacterSelect";
import "./Navigation.css";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <div id="nav-bar">
            <NavLink to="/">
                <h1>WowCollector</h1>
            </NavLink>
            <CharacterSelect />
            <div id="nav-bar-middle">
                <NavLink to="/app/achievements">Achievements</NavLink>
                <NavLink to="/app/mounts">Mounts</NavLink>
            </div>
            {isLoaded && sessionUser ? (
                <div id="nav-logged-out">
                    {/* <NavLink className="nav-link" to="/groups/new">
                        Start a new group
                    </NavLink> */}
                    <ProfileButton user={sessionUser} />
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
