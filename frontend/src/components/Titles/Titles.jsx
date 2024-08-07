import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTitleList } from "../../redux/resources";
import TitleCategory from "./TitleCategory";
import "./Titles.css";
import TitleDetails from "./TitleDetails";
import TitleButton from "./TitleButton";

export default function Titles() {
    const titles = useSelector((state) => state.resources.title_list);
    const selectedCategory = useSelector(
        (state) => state.resources.current_title_category
    );
    const dispatch = useDispatch();

    // on load component, if title_list doesnt exist
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
                    <TitleCategory key={key} name={key} />
                ))}
            </div>
            <div id="titles-and-details-container">
                {selectedCategory ? (
                    <div id="titles-and-details">
                        <TitleDetails />
                        <div id="title-list">
                            {titles[selectedCategory] &&
                                titles[selectedCategory].map((title) => (
                                    <TitleButton key={title.id} title={title} />
                                ))}
                        </div>
                    </div>
                ) : (
                    <h3>Select a category on the left to view titles.</h3>
                )}
            </div>
        </div>
    );
}
