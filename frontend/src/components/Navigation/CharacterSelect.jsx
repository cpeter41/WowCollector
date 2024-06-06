import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCharacter } from "../../redux/characters";
import "./CharacterSelect.css";

export default function CharacterSelect() {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const [isOpen, setOpen] = useState(false);
    const selChar = useSelector((state) => state.characters.selCharacter);
    const characters = useSelector((state) => state.characters.characterList);
    const user = useSelector((state) => state.session.user);

    const unSlug = (serverSlug) => {
        const slugParts = serverSlug.split("-");
        const capitalizedParts = slugParts.map((part) => {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        });
        return capitalizedParts.join("");
    };

    useEffect(() => {
        if (!isOpen) return;

        const closeDropdown = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", closeDropdown);

        return () => document.removeEventListener("click", closeDropdown);
    }, [isOpen]);

    return (
        <div>
            {/* load character select if signed in */}
            {user && (
                <button
                    id="selected-character-button"
                    onClick={(e) => {
                        // toggle. dont propagate to avoid closeDropdown
                        e.stopPropagation();
                        setOpen(!isOpen);
                    }}
                >
                    {selChar
                        ? `${selChar.name}-${unSlug(selChar.serverSlug)}`
                        : "No Character Selected"}
                </button>
            )}
            <ul
                className={`characters-dropdown ${isOpen ? "" : " hidden"}`}
                ref={ulRef}
            >
                {characters.map((char) => (
                    <li
                        key={char.id}
                        onClick={() => {
                            setOpen(false);
                            dispatch(selectCharacter(char));
                        }}
                    >{`${char.name}-${unSlug(char.serverSlug)}`}</li>
                ))}
                <li id="add-character-button">
                    <i className="fa-solid fa-plus"></i>
                </li>
            </ul>
        </div>
    );
}
