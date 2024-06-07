import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCharactersOfUser } from "../../redux/characters";
import "./MainPage.css";

export default function MainPage() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const characters = useSelector((state) => state.characters.characterList);

    useEffect(() => {
        if (user) dispatch(getCharactersOfUser());
    }, [dispatch, user]);

    return (
        <>
            <h2>Mounts not yet implemented.</h2>
            {/* <p>To use Wowcollector, add a character</p> */}
            {user && characters?.length && (
                <>
                    <h3>Characters:</h3>
                    <ul>
                        {characters.map((character) => (
                            <li
                                key={character.id}
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
