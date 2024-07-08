export default function renderCriteria(title, onClick) {
    switch (title?.source?.type.type) {
        case "ACHIEVEMENT":
            return (
                <div id="source-criteria">
                    Source:{" "}
                    <button className="title-criteria" onClick={onClick}>
                        {
                            title.source.achievements[
                                title.source.achievements.length - 1
                            ].name
                        }
                    </button>
                </div>
            );
        case "QUEST":
            return (
                <div id="source-criteria">
                    Source: &quot;
                    <span>
                        {
                            title.source.quests[title.source.quests.length - 1]
                                .name
                        }
                    </span>
                    &quot; quest.
                </div>
            );
        default:
            return <span>No source listed.</span>;
    }
}
