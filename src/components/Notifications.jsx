import React from "react";

const Notifications = ({ title, notifications, type }) => {
    const iconColors = {
        interaction: "text-green-600",
        alert: "text-red-600",
        info: "text-blue-600",
    };

    const backgroundColors = {
        interaction: "bg-green-50",
        alert: "bg-red-50",
        info: "bg-blue-50",
    };

    const getIcon = (type) => {
        switch (type) {
            case "interaction":
                return (
                    <svg
                        className={`w-5 h-5 mr-2 ${iconColors.interaction}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 8a1 1 0 112-0v4a1 1 0 11-2 0V8zm0-3a1 1 0 112-0v1a1 1 0 11-2 0V5z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "alert":
                return (
                    <svg
                        className={`w-5 h-5 mr-2 ${iconColors.alert}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 8A8 8 0 11-2 8a8 8 0 0116 0zM8.9 13a.9.9 0 10-1.8 0 .9.9 0 101.8 0zM8 5a1 1 0 00-.894 1.447L7.618 8.59a1 1 0 00.764.745l1.447.289a1 1 0 11-.36 1.96l-1.448-.289a3 3 0 01-2.293-2.237L6.6 6.553A3 3 0 018 3h1a3 3 0 010 6H8z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case "info":
            default:
                return (
                    <svg
                        className={`w-5 h-5 mr-2 ${iconColors.info}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 8a1 1 0 112-0v6a1 1 0 11-2 0V8zm0-3a1 1 0 112-0v1a1 1 0 11-2 0V5z"
                            clipRule="evenodd"
                        />
                    </svg>
                );

        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            {notifications && notifications.length > 0 ? (
                <ul className="space-y-4">
                    {notifications.map((notification, index) => (
                        <li
                            key={index}
                            className={`flex items-center p-3 border rounded-md ${
                                backgroundColor[type]
                            }`}
                        >
                            {getIcon(type)}
                            <span>{notification}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No notifications available</p>
            )}
        </div>
    );
};

export default Notifications;