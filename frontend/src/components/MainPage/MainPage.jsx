import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MainPage.css";
import { getCharactersOfUser } from "../../redux/characters";

export default function MainPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const characters = useSelector((state) => state.characters);

    useEffect(() => {
        if (user) dispatch(getCharactersOfUser());
    }, [dispatch, user]);

    useEffect(() => {
        if (characters?.length) {
            console.log("characters: ", characters);
        }
    }, [characters]);

    return (
        <>
            <h1>Home Page</h1>
            {user && characters?.length && (
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
