import React from 'react';
import { useSelector } from 'react-redux';

const NotificationBox = ({ onClose }) => {
  const notifications = useSelector((state) => state.notifications);

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold">Notifications</span>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
      </div>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className="mb-2">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationBox;
