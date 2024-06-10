import { useEffect } from "react";
import { getMountList } from "../../redux/resources";
import { useDispatch, useSelector } from "react-redux";
import { selectMountCategory, selectMount } from "../../redux/resources";
import "./Mounts.css";

export default function Mounts() {
    const mounts = useSelector((state) => state.resources.mount_list);
    const selectedCategoryKey = useSelector(
        (state) => state.resources.current_mount_category
    );
    const selectedMount = useSelector((state) => state.resources.current_mount);
    const dispatch = useDispatch();
    // const [mountArray, setArray] = useState([]);

    // on load component, if mount_list doesnt exist
    useEffect(() => {
        if (!Object.keys(mounts).length) dispatch(getMountList());
    });

    const handleCategoryClick = (e) => {
        let id;
        if (e.target.id.startsWith("h")) id = e.target.id.slice(1);
        else id = e.target.id;
        const mountCategory = document.getElementById(id);
        // swaps selected className
        if (!mountCategory.classList.contains("selected")) {
            // unselect mount from details when switching categories
            dispatch(selectMount());
            dispatch(selectMountCategory(e.target.id));
            const mountCategories = document.getElementById(
                "mount-category-container"
            );
            const oldSelectedCategory =
                mountCategories.getElementsByClassName("selected")[0];
            if (oldSelectedCategory)
                oldSelectedCategory.classList.remove("selected");
            mountCategory.classList.add("selected");
        }
    };

    const handleMountClick = (e) => {
        // be wary of e.target.id when more things are in the mount button
        const mount = document.getElementById(e.target.id);
        // swaps selected className
        if (!mount?.classList.contains("selected")) {
            dispatch(selectMount(e.target.id));
            const mountList = document.getElementById(
                "mounts-in-category-list"
            );
            const oldSelMount = mountList.getElementsByClassName("selected")[0];
            if (oldSelMount) oldSelMount.classList.remove("selected");
            mount.classList.add("selected");
        }
    };

    return (
        <div id="mounts-container">
            <div id="mount-category-container">
                <div id="mounts-categories-header">
                    <h2>Mounts</h2>
                </div>
                {Object.keys(mounts).map((key) => {
                    // filter out the strange nonimplemented mounts ("[" category)
                    if (key !== "[")
                        return (
                            <div
                                className="mount-category"
                                key={key}
                                id={key}
                                onClick={handleCategoryClick}
                            >
                                <h3 id={`h${key}`}>{key}</h3>
                            </div>
                        );
                })}
            </div>
            <div id="mounts-and-details-container">
                <div id="mount-details">
                    <h2>{selectedMount.name}</h2>
                </div>
                <div id="mounts-in-category-list">
                    {mounts &&
                        mounts[selectedCategoryKey] &&
                        mounts[selectedCategoryKey].map((mount) => (
                            <div
                                className="mount-item"
                                id={mount.id}
                                key={mount.id}
                                onClick={handleMountClick}
                            >
                                {mount.name}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
