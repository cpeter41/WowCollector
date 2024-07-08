export default function TrackerItem({ item, del, note, nav }) {
    return (
        <li className="tracked title" key={item.id} id={`t${item.blizzId}`}>
            <div className="tracker-button">
                <i className="fa-regular fa-circle-xmark fa-lg"></i>
                <i
                    className="fa-solid fa-circle-xmark fa-lg"
                    onClick={() => del(item)}
                ></i>
            </div>
            <div className="tracker-button" id="comment-button">
                <i className="fa-regular fa-comment fa-lg"></i>
                <i
                    className="fa-solid fa-comment fa-lg"
                    onClick={() => note(item)}
                ></i>
            </div>
            <span onClick={() => nav(item)}>
                <h4>{item.name}</h4>
                <div>{item.note}</div>
            </span>
        </li>
    );
}
