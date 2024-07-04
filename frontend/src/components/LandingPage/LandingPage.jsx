import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SignupFormModal from "../Modals/SignupFormModal";
import { useModal } from "../../context/Modal";
import AddCharacterModal from "../Modals/AddCharacterModal";
import Footer from "../Footer";
import "./LandingPage.css";

export default function LandingPage() {
    const user = useSelector((state) => state.session.user);
    const { setModalContent } = useModal();

    return (
        <>
            <div id="landing-page-container">
                <div id="landing-page-info">
                    <h1>Welcome to WowCollector!</h1>
                    <p>
                        This website is designed to track collectibles in World
                        of Warcraft. Currently supported collectibles are:{" "}
                    </p>
                    <ul>
                        <li>Achievements</li>
                        <li>Mounts</li>
                        <li>Titles</li>
                    </ul>
                    <p>
                        You can view ALL collectibles without an account. If you
                        want to track these collectibles, an account is{" "}
                        <span className="emph-bold">required</span>.
                    </p>
                    <h2>Get Started:</h2>
                    <p style={{ marginBottom: "12px" }}>
                        To track a collectible, sign up and{" "}
                        {user ? (
                            <span
                                onClick={() =>
                                    setModalContent(<AddCharacterModal />)
                                }
                                id="alt-char-button"
                            >
                                attach a World of Warcraft character to your
                                account.
                            </span>
                        ) : (
                            <span>
                                attach a World of Warcraft character to your
                                account.
                            </span>
                        )}{" "}
                        Then press the{" "}
                        <i
                            className="fa-solid fa-crosshairs fa-xl"
                            style={{ color: "lightcyan" }}
                        ></i>{" "}
                        button on a collectible to add it to that
                        character&apos;s tracker.
                    </p>
                    <p>Multiple characters can be added to an account.</p>
                    {!user && (
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            modalComponent={<SignupFormModal />}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
