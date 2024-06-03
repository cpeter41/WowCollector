import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import "../LoginFormModal/LoginForm.css";

const PROFILE_ICONS_LEN = 12;
const profileIcons = [];
for (let i = 1; i <= PROFILE_ICONS_LEN; i++) profileIcons.push(i);

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [imageId, setImageId] = useState(
        Math.ceil(Math.random() * PROFILE_ICONS_LEN)
    );
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            console.log(imageId);
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    password,
                    imageId
                })
            )
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data?.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({ confirmPassword: "Passwords do not match." });
    };

    return (
        <div className="flex-col" id="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex-col" id="signup-form">
                <div className="signup-div">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <span>{errors.email}</span>
                </div>
                <div className="signup-div">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <span>{errors.username}</span>
                </div>
                <div className="signup-div">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <span>{errors.password}</span>
                </div>
                <div className="signup-div">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                    />
                    <span>{errors.confirmPassword}</span>
                </div>
                <div id="profile-icons">
                    {profileIcons.map((iconId) => (
                        <label key={iconId}>
                            <input
                                type="radio"
                                name="profile-icon-sel"
                                id={`profileIcon${iconId}`}
                                value={iconId}
                                checked={imageId === iconId}
                                onChange={(e) => {
                                    setImageId(parseInt(e.target.value));
                                }}
                            />
                            icon {iconId}
                        </label>
                    ))}
                </div>
                <button type="submit" id="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupFormModal;
