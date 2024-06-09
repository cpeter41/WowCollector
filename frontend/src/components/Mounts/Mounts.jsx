import { useEffect } from "react";
import { getMountList } from "../../redux/resources";
import { useDispatch, useSelector } from "react-redux";

export default function Mounts() {
    const mounts = useSelector((state) => state.resources.mount_list);
    const dispatch = useDispatch();

    // on load component, if mount_list doesnt exist
    useEffect(() => {
        if (!mounts?.length) dispatch(getMountList());
    });

    return (
        <div>
            {mounts && (
                <ul>
                    {mounts.map((mount) => (
                        <li key={mount.id} id={mount.id}>
                            {mount.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
