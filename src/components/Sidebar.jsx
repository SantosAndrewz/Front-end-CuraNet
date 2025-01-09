const Sidebar = ({ sections, onSelectItem, searchPlaceholder, backgroundColor, textColor }) => {
    return (
        <div className={`w-1/4 p-4 ${backgroundColor} ${textColor}`}>
            {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6">
                    <h2 className="text-lg font-bold">{section.title}</h2>
                    <ul>
                        {section.items.map((item, itemIndex) => (
                            <li
                                key={itemIndex}
                                className="p-2 cursor-pointer hover:bg-blue-200"
                                onClick={() => onSelectItem(item, section.title)}
                            >
                                {Object.values(item).join(" - ")} {/* Display item content */}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};