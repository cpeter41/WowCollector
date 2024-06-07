import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getAchievementCategories,
    getCategoryDetails,
} from "../../redux/resources";
import CategoryDetails from "./CategoryDetails";
import "./Achievements.css";

// const _slug = (name) => {
//     const singleName = name.replace("'", "");
//     const noAnds = singleName.replace("&", encodeURIComponent("&"));
//     const noColons = noAnds.replace(":", encodeURIComponent(":"));
//     const parts = noColons.split(" ");
//     const lcParts = parts.map((part) => part.toLowerCase());
//     return lcParts.join("-");
// };

export default function Achievements() {
    let { categoryId } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const achievement_categories = useSelector(
        (state) => state.resources.achievement_categories
    );

    const handleCategoryClick = (e) => {
        dispatch(getCategoryDetails(e.target.id));
        navigate(`/achievements/${e.target.id}`);
    };

    // runs on initial component render
    useEffect(() => {
        dispatch(getAchievementCategories());
    }, [dispatch]);

    return categoryId === undefined ? (
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
        <CategoryDetails categoryId={categoryId}/>
    );
}
