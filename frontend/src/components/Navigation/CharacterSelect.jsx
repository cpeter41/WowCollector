import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCharacter, deleteCharacter } from "../../redux/characters";
import AddCharacterModal from "../Modals/AddCharacterModal";
import { useModal } from "../../context/Modal";
import "./CharacterSelect.css";

export default function CharacterSelect() {
    const dispatch = useDispatch();
    const ulRef = useRef();
    const [isOpen, setOpen] = useState(false);
    const selChar = useSelector((state) => state.characters.selCharacter);
    const characters = useSelector((state) => state.characters.characterList);
    const user = useSelector((state) => state.session.user);
    const { setModalContent } = useModal();

    const handleDeleteCharacter = (e) => {
        e.stopPropagation();
        dispatch(deleteCharacter(e.target.id));
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
                <div
                    id="selected-character-button"
                    onClick={(e) => {
                        // toggle. dont propagate to avoid closeDropdown
                        e.stopPropagation();
                        setOpen(!isOpen);
                    }}
                >
                    <i className="fa-solid fa-shield-halved fa-xl"></i>
                    {/**
                     * this displays a name-server combo as it is ingame.
                     * e.g. character Christopher on server Borean Tundra will
                     * look like: Christopher-BoreanTundra
                     *  */}
                    {selChar
                        ? `${selChar.name}-${selChar.serverName.replace(
                              " ",
                              ""
                          )}`
                        : "No Character Selected"}
                </div>
            )}
            <ul
                className={`characters-dropdown${isOpen ? "" : " hidden"}`}
                ref={ulRef}
            >
                {characters.map((char) => (
                    <li
                        className="tracked-character"
                        key={char.id}
                        onClick={() => {
                            setOpen(false);
                            dispatch(selectCharacter(char));
                        }}
                    >
                        <div className="delete-button">
                            <i className="fa-regular fa-circle-xmark fa-lg"></i>
                            <i
                                className="fa-solid fa-circle-xmark fa-lg"
                                id={char.id}
                                onClick={handleDeleteCharacter}
                            ></i>
                        </div>
                        {`${char.name}-${char?.serverName.replace(" ", "")}`}
                    </li>
                ))}
                <li
                    id="add-character-button"
                    onClick={() => setModalContent(<AddCharacterModal />)}
                >
                    <i className="fa-solid fa-plus"></i>
                </li>
            </ul>
        </div>
    );
}
