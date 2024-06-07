import { useDispatch, useSelector } from "react-redux";
import AchievementDetails from "./AchievementDetails";
import { useEffect } from "react";
import { getCategoryDetails } from "../../redux/resources";

export default function CategoryDetails({ categoryId }) {
    const dispatch = useDispatch();
    const categoryDetails = useSelector(
        (state) => state.resources.current_category
    );

    // loads category if not in store based on url
    useEffect(() => {
        if (!Object.keys(categoryDetails).length)
            dispatch(getCategoryDetails(categoryId));
    }, [categoryDetails, categoryId, dispatch]);

    return (
        <>
            <div id="category-details-left-col">
                <ul>
                    <li className="subcategory">Global</li>
                    {categoryDetails?.subcategories?.map((subcat) => (
                        <li className="subcategory" key={subcat.id}>
                            {subcat.name}
                        </li>
                    ))}
                </ul>
            </div>
            <AchievementDetails />
        </>
    );
}
