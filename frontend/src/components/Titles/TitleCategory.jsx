import { selectTitleCategory } from "../../redux/resources";
import { useDispatch } from "react-redux";

export default function TitleCategory({ name, selected }) {
    const dispatch = useDispatch();

    return (
        <div
            className={`title-category ${selected ? "selected" : ""}`}
            onClick={() => dispatch(selectTitleCategory(name))}
        >
            <h3>{name}</h3>
        </div>
    );
}
