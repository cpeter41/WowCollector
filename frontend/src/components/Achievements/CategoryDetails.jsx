import { useDispatch, useSelector } from "react-redux";
import AchievementContainer from "./AchievementContainer";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {
    getSubCategoryDetails,
    clearSelections,
    clearAchievementSelection,
} from "../../redux/resources";
import "./Achievements.css";

// TODO: show progress bar on each subcategory

export default function CategoryDetails({ setOnRootPage }) {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const categoryDetails = useSelector(
        (state) => state.resources.current_category
    );
    const subcategoryDetails = useSelector(
        (state) => state.resources.current_subcategory
    );

    useEffect(() => {
        // loads subcategory if not in store on init load
        if (Object.keys(categoryDetails).length) {
            dispatch(getSubCategoryDetails(categoryDetails.id));
        }
    }, [categoryDetails, dispatch]);

    // unselects the global subcategory and gets details of new selection
    const handleSubcategoryClick = (e) => {
        const lastSelectedSubcat = document.getElementsByClassName(
            "subcategory selected"
        )[0];
        if (lastSelectedSubcat === e.target) return;
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
            dispatch(getSubCategoryDetails(categoryDetails.id));
            dispatch(clearAchievementSelection());
        }
    };

    const handleCategoryBackClick = () => {
        dispatch(clearSelections());
        // navigate("/achievements");
        setOnRootPage(true);
    };

    return (
        <div id="category-details-container">
            <div id="category-details-subcategories">
                <div
                    id="subcategories-header"
                    onClick={handleCategoryBackClick}
                >
                    <i className="fa-solid fa-angle-left fa-2xl"></i>
                    <h3>{categoryDetails.name}</h3>
                </div>
                <ul>
                    {/* TODO: move header up and make the subcats scrollable,
                    making the header always visible */}

                    <li
                        className={`subcategory ${categoryDetails.id === subcategoryDetails.id ? "selected" : ""}`}
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
