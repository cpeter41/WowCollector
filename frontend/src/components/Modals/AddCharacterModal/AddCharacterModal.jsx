import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AddCharacterModal() {
    const dispatch = useDispatch();
    const [region, setRegion] = useState("us");
    const [serverName, setServer] = useState("");
    const [name, setName] = useState("");

    return (
        <div id="add-character-container">
            <form id="add-character-form">
                <label>Region:</label>
                <select name="region" onChange={(option) => setRegion(option)}>
                    <option value="us">US</option>
                    <option value="eu">US</option>
                </select>

                <label>Server:</label>
                <select name="server">
                    
                </select>
            </form>
        </div>
    );
}
