import { selectTitle } from "../../redux/resources";
import { useDispatch, useSelector } from "react-redux";

export default function TitleButton({ title }) {
    const selectedTitle = useSelector((state) => state.resources.current_title);
    const dispatch = useDispatch();

    const handleTitleClick = () => {
        if (selectedTitle.name !== title.name) dispatch(selectTitle(title));
    };

    return (
        <div
            className={`title-item${
                title.name === selectedTitle.name ? " selected" : ""
            }`}
            onClick={handleTitleClick}
        >
            {title.name}
        </div>
    );
}
