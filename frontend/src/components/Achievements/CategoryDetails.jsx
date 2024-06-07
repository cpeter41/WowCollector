import { useDispatch, useSelector } from "react-redux";
import AchievementDetails from "./AchievementDetails";
import { useEffect } from "react";
import {
    getCategoryDetails,
    getSubCategoryDetails,
    getGlobalSubcategoryDetails,
} from "../../redux/resources";
import "./Achievements.css";

// TODO: show progress bar on each subcategory

export default function CategoryDetails({ categoryId }) {
    const dispatch = useDispatch();
    const categoryDetails = useSelector(
        (state) => state.resources.current_category
    );
    const subcategoryDetails = useSelector(
        (state) => state.resources.current_subcategory
    );

    // loads category if not in store based on url
    useEffect(() => {
        if (!Object.keys(categoryDetails).length)
            dispatch(getCategoryDetails(categoryId));
    }, [categoryDetails, categoryId, dispatch]);

    const handleSubcategoryClick = (e) => {
        const globalSubcat = document.getElementById("global-subcategory");
        if (globalSubcat.classList.contains("selected")) globalSubcat.classList.remove("selected");
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
            if (lastSelectedSubcat) lastSelectedSubcat.classList.remove("selected");
            e.target.classList.add("selected");
            dispatch(getSubCategoryDetails(categoryId));
        }
    };

    return (
        <div id="category-details-container">
            <div id="category-details-subcategories">
                <ul>
                    <li
                        className={`subcategory`}
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
            <AchievementDetails />
        </div>
    );
}
