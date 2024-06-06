import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import LoginFormModal from "../Modals/LoginFormModal";
import SignupFormModal from "../Modals/SignupFormModal";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
    const user = useSelector((state) => state.session.user);
    const navigate = useNavigate();

    return (
        <div id="landing-page-container">
            <div id="landing-page-center-div">
                <div
                    className="home-nav-button clickable"
                    onClick={() => {
                        // navigate to main page
                        navigate("/app");
                    }}
                >
                    <h1>Welcome to WowCollector!</h1>
                    <p>
                        A simple site that displays your World of Warcaft
                        characters&apos; collections!
                    </p>
                    <h4>Navigate to Home Page</h4>
                </div>
                {!user && (
                    <div>
                        <OpenModalMenuItem
                            itemText="Log In"
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
