import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
import {
    setAchievementCategories,
    getCategoryDetails,
} from "../../redux/resources";
import { csrfFetch } from "../../redux/csrf";
import CategoryDetails from "./CategoryDetails";
import "./Achievements.css";


// const _enhancedSlug = (name) => {
//     const singleName = name.replace("'", "");
//     const noAnds = singleName.replace("&", encodeURIComponent("&"));
//     const noColons = noAnds.replace(":", encodeURIComponent(":"));
//     const parts = noColons.split(" ");
//     const lcParts = parts.map((part) => part.toLowerCase());
//     return lcParts.join("-");
// };

let data;
if (typeof window !== "undefined") {
    const res = await csrfFetch("/api/resources/achievements/categories");
    data = await res.json();
}

export default function Achievements() {
    // let { categoryId } = useParams();
    // let navigate = useNavigate();
    const dispatch = useDispatch();
    const [onRootPage, setOnRootPage] = useState(true);
    const selectedAchievement = useSelector(
        (state) => state.resources.current_achievement
    );
    const achievement_categories = useSelector(
        (state) => state.resources.achievement_categories
    );

    const handleCategoryClick = (e) => {
        dispatch(getCategoryDetails(e.target.id));
        // navigate(`/achievements/${e.target.id}`);
        setOnRootPage(false);
    };

    // runs on initial component render
    useEffect(() => {
        if (Object.keys(selectedAchievement).length) {
            setOnRootPage(false);
        }
        if (!achievement_categories[0]?.subcategories)
            dispatch(setAchievementCategories(data));
    });

    return onRootPage ? (
        <div id="category-container">
            <div id="category-wrapper">
                {achievement_categories &&
                    achievement_categories.map((cat) => (
                        <div
                            key={cat.id}
                            id={cat.id}
                            className="achievement-category"
                            onClick={handleCategoryClick}
                        >
                            {cat.name}
                        </div>
                    ))}
            </div>
        </div>
    ) : (
        <CategoryDetails setOnRootPage={setOnRootPage} />
    );
}
