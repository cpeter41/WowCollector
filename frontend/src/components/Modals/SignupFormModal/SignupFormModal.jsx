import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import * as sessionActions from "../../../redux/session";
import "./SignupForm.css";
import "../LoginFormModal/LoginForm.css";
// import aws from "aws-sdk";

const PROFILE_ICONS_LEN = 12;
const profileIcons = [];
for (let i = 1; i <= PROFILE_ICONS_LEN; i++) profileIcons.push(i);

function SignupFormModal() {
    // console.log(import.meta.env.VITE_AWS_ACCESS_KEY_ID);
    // aws.config.update({
    //     accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    //     secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    // });
    // const s3 = new aws.S3({
    //     params: { Bucket: import.meta.env.VITE_S3_BUCKET },
    //     region: import.meta.env.VITE_AWS_REGION,
    // });
    // console.log(s3);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    // const [imageId, setImageId] = useState(
    //     Math.ceil(Math.random() * PROFILE_ICONS_LEN)
    // );
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // consider setting imageurl default to something from aws
    // const [imageFile, setImageFile] = useState(null);
    // const [imageUrl, setImageUrl] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // let formData = new FormData();
        // formData.append("file", imageFile);
        // const params = {
        //     Bucket: import.meta.env.VITE_S3_BUCKET,
        //     Key: imageFile.name,
        //     Body: imageFile
        // }

        // const upload = s3.putObject(params).promise();
        // await upload.then((e) => {
        //     console.log(e);
        //     console.log("done");
        // })

        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    password,
                    imageId: 1,
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

    // const handleImageChange = (e) => {
    //     e.stopPropagation();

    //     const file = e.target.files[0];
    //     setImageFile(file);

    //     setImageUrl(URL.createObjectURL(file));
    // };

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
                {/* <div id="image-upload">
                    <div id="choose-image">
                        <label htmlFor="image-input">
                            Choose a Profile Image
                        </label>
                        <input
                            id="image-input"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleImageChange}
                        ></input>
                    </div>
                    <div id="preview-image">
                        {imageUrl !== "" && (
                            <img src={imageUrl} alt="profile-picture" />
                        )}
                    </div>
                </div> */}
                {/* <div id="profile-icons">
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
                </div> */}
                <button type="submit" id="signup-submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignupFormModal;
