import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MainPage.css";
import { getCharactersOfUser } from "../../redux/characters";

export default function MainPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const characters = useSelector((state) => state.characters);
    // TODO: move logInStatus to wrapper, pass in via props
    const [logInStatus, setLogInStatus] = useState(false);

    useEffect(() => {
        if (user) {
            setLogInStatus(true);
            dispatch(getCharactersOfUser());
        } else setLogInStatus(false);
    }, [dispatch, user]);

    useEffect(() => {
        if (logInStatus && characters?.length) {
            console.log(characters);
        }
    }, [characters, logInStatus]);

    return (
        <>
            <h1>Home Page</h1>
            {logInStatus && characters?.length && (
                <>
                    <h2>Characters:</h2>
                    <ul>
                        {characters.map((character) => (
                            <li key={character.id}>{character.name}</li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}
