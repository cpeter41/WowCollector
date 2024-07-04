import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTitleList } from "../../redux/resources";
import TitleCategory from "./TitleCategory";
import "./Titles.css";

export default function Titles() {
    // const user = useSelector((state) => state.session.user);
    const titles = useSelector((state) => state.resources.title_list);
    const selectedCategory = useSelector(
        (state) => state.resources.current_title_category
    );
    const dispatch = useDispatch();

    // on load component, if mount_list doesnt exist
    useEffect(() => {
        if (!Object.keys(titles).length) dispatch(getTitleList());
    });

    return (
        <div id="titles-container">
            <div id="title-categories">
                <div id="title-categories-header">
                    <h2>Titles (A - Z)</h2>
                </div>
                {Object.keys(titles).map((key) => (
                    <TitleCategory
                        key={key}
                        name={key}
                        selected={key === selectedCategory}
                    />
                ))}
            </div>
        </div>
    );
}
