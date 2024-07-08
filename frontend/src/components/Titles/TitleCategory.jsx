import { selectTitleCategory } from "../../redux/resources";
import { useDispatch, useSelector } from "react-redux";

export default function TitleCategory({ name }) {
    const dispatch = useDispatch();
    const selectedCategory = useSelector(
        (state) => state.resources.current_title_category
    );

    const handleCatClick = () => {
        if (name !== selectedCategory) dispatch(selectTitleCategory(name));
    };

    return (
        <div
            className={`title-category${
                name === selectedCategory ? " selected" : ""
            }`}
            onClick={handleCatClick}
        >
            <h3>{name}</h3>
        </div>
    );
}
