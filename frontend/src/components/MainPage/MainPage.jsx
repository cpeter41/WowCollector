import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharactersOfUser, selectCharacter } from "../../redux/characters";
import "./MainPage.css";

export default function MainPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const characters = useSelector((state) => state.characters.characterList);

    // const setSelectedCharacter = (character) => {
    //     dispatch(selectCharacter(character));
    // }

    useEffect(() => {
        if (user) dispatch(getCharactersOfUser());
    }, [dispatch, user]);

    // useEffect(() => {
    //     if (characters?.length) {
    //         console.log("characters: ", characters);
    //     }
    // }, [characters]);

    return (
        <>
            <h2>Home Page</h2>
            {user && characters?.length && (
                <>
                    <h3>Characters:</h3>
                    <ul>
                        {characters.map((character) => (
                            <li
                                key={character.id}
                                onClick={() => dispatch(selectCharacter(character))}
                            >
                                {character.name}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}
