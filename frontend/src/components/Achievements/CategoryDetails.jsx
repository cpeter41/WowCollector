import { useDispatch, useSelector } from "react-redux";
import AchievementContainer from "./AchievementContainer";
import { useEffect } from "react";
import {
    getCategoryDetails,
    getSubCategoryDetails,
} from "../../redux/resources";
import "./Achievements.css";

// TODO: show progress bar on each subcategory
// TODO: show selected CATEGORY details at top of subcategory list
// also put a back button :)
// TODO: dont dispatch if subcategory is already selected

export default function CategoryDetails({ categoryId }) {
    const dispatch = useDispatch();
    const categoryDetails = useSelector(
        (state) => state.resources.current_category
    );
    const subcategoryDetails = useSelector(
        (state) => state.resources.current_subcategory
    );

    useEffect(() => {
        if (!Object.keys(categoryDetails).length) {
            // loads category if not in store on load
            dispatch(getCategoryDetails(categoryId));
            // loads subcategory if not in store on load
            dispatch(getSubCategoryDetails(categoryId));
        }
    }, [categoryDetails, categoryId, dispatch]);

    const handleSubcategoryClick = (e) => {
        const globalSubcat = document.getElementById("global-subcategory");
        if (globalSubcat.classList.contains("selected"))
            globalSubcat.classList.remove("selected");
        dispatch(getSubCategoryDetails(e.target.id));
    };

    const handleGlobalSubcatClick = (e) => {
        if (!e.target.classList.contains("selected")) {
            const subCategories = document.getElementById(
                "category-details-subcategories"
            );
            const lastSelectedSubcat = subCategories.getElementsByClassName(
                "subcategory selected"
            )[0];
            if (lastSelectedSubcat)
                lastSelectedSubcat.classList.remove("selected");
            e.target.classList.add("selected");
            dispatch(getSubCategoryDetails(categoryId));
        }
    };

    return (
        <div id="category-details-container">
            <div id="category-details-subcategories">
                <ul>
                    <li
                        className={`subcategory selected`}
                        id="global-subcategory"
                        onClick={handleGlobalSubcatClick}
                    >
                        Global
                    </li>
                    {categoryDetails?.subcategories?.map((subcat) => (
                        <li
                            className={`subcategory${
                                subcat.id === subcategoryDetails?.id
                                    ? " selected"
                                    : ""
                            }`}
                            key={subcat.id}
                            id={subcat.id}
                            onClick={handleSubcategoryClick}
                        >
                            {subcat.name}
                        </li>
                    ))}
                </ul>
            </div>
            <AchievementContainer />
        </div>
    );
}
