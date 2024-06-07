import { useSelector } from "react-redux";

export default function AchievementDetails() {
    // TODO: list achievements in subcategory
    // TODO: display selected achievement
    // TODO: highlight achievement if obtained by character
    const current_subcategory = useSelector(
        (state) => state.resources.current_subcategory
    );
    return (
        <div id="">
            {current_subcategory?.achievements_in_category?.map((ach) => (
                <div className="achievement-button" key={ach.id}>{ach.name}</div>
            ))}
        </div>
    );
}
