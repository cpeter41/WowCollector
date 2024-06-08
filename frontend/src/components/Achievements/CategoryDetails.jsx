import { useDispatch, useSelector } from "react-redux";
import AchievementContainer from "./AchievementContainer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getCategoryDetails,
    getSubCategoryDetails,
    clearSelections,
    clearAchievementSelection,
} from "../../redux/resources";
import "./Achievements.css";

// TODO: show progress bar on each subcategory
// TODO: show selected CATEGORY details at top of subcategory list
// also put a back button :)
// TODO: dont dispatch if subcategory is already selected

export default function CategoryDetails({ categoryId }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const categoryDetails = useSelector(
        (state) => state.resources.current_category
    );
    const subcategoryDetails = useSelector(
        (state) => state.resources.current_subcategory
    );

    useEffect(() => {
        // loads category/subcategory if not in store on load
        if (!Object.keys(categoryDetails).length) {
            dispatch(getCategoryDetails(categoryId));
            dispatch(getSubCategoryDetails(categoryId));
        }
    }, [categoryDetails, categoryId, dispatch]);

    // unselects the global subcategory and gets details of new selection
    const handleSubcategoryClick = (e) => {
        const globalSubcat = document.getElementById("global-subcategory");
        if (globalSubcat.classList.contains("selected"))
            globalSubcat.classList.remove("selected");
        dispatch(getSubCategoryDetails(e.target.id));
        dispatch(clearAchievementSelection());
    };

    // unselects the selected subcategory and gets details of global subcategory
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
            dispatch(clearAchievementSelection());
        }
    };

    const handleCategoryBackClick = () => {
        dispatch(clearSelections());
        navigate("/achievements");
    };

    return (
        <div id="category-details-container">
            <div id="category-details-subcategories">
                <ul>
                    {/* TODO: move header up and make the subcats scrollable,
                    making the header always visible */}
                    <li
                        id="subcategories-header"
                        onClick={handleCategoryBackClick}
                    >
                        <i className="fa-solid fa-angle-left fa-2xl"></i>
                        <h3>{categoryDetails.name}</h3>
                    </li>
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
