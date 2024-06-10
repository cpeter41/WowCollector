import { useState } from "react";
import { useDispatch } from "react-redux";
import serverList from "../../../utils/serverList.js";
import { addCharacter } from "../../../redux/characters.js";
import { useModal } from "../../../context/Modal.jsx";
import "./AddCharacterModal.css"

export default function AddCharacterModal() {
    const dispatch = useDispatch();
    const [region, setRegion] = useState("us");
    const [serverName, setServer] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        const char = { region, serverName, name };
        return dispatch(addCharacter(char))
        .then(closeModal)
        .catch(async (res) => {
            if (res.status >= 400) setError("Character not found.")
        })
    };

    return (
        <div id="add-character-container">
            <form id="add-character-form" onSubmit={handleSubmit}>
                <span>Support for other regions coming soon!</span>
                <span id="error-box">{error}</span>
                <label>Region:</label>
                <select
                    name="region"
                    onChange={(option) => setRegion(option)}
                    required
                >
                    <option value="us">US</option>
                    {/* <option value="eu">US</option> */}
                </select>

                <label>Server:</label>
                <select
                    name="server"
                    onChange={(option) => {
                        setServer(option.target.value)
                    }}
                    required
                >
                    {serverList.map((server) => (
                        <option key={server} value={server}>
                            {server}
                        </option>
                    ))}
                </select>

                <label>Character Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <button id="add-character-submit-button" type="submit">Add Character</button>
            </form>
        </div>
    );
}
