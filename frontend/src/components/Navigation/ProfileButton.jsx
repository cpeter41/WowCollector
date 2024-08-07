import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../redux/session";
import { clearCharactersFromStore, selectCharacter } from "../../redux/characters";
import { clearTracker } from "../../redux/tracker";
// import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import "./Navigation.css";

function ProfileButton({ user }) {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        dispatch(clearCharactersFromStore());
        dispatch(selectCharacter(null));
        dispatch(clearTracker());
        closeMenu();
        // navigate("/");
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button id="profile-button" onClick={toggleMenu}>
                <i
                    className="fas fa-user-circle fa-xl"
                />
                {showMenu ? (
                    <i className="fa-solid fa-angle-down fa-xl"></i>
                ) : (
                    <i className="fa-solid fa-angle-up fa-xl"></i>
                )}
            </button>
            <ul className={ulClassName} ref={ulRef}>
                <>
                    <li className="profile-li">Hello, {user.username}</li>
                    <li className="profile-li bottom-border">{user.email}</li>
                    <li id="logout-li">
                        <button onClick={logout} id="logout">
                            Log Out
                        </button>
                    </li>
                </>
            </ul>
        </>
    );
}

export default ProfileButton;
