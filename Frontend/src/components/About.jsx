// // src/components/NotificationPage.js
// import React, { useState } from 'react';
// import { FaTrash } from 'react-icons/fa';
// import './About.css';

// const NotificationPage = () => {
//   // Sample notifications data (you might fetch this from an API in a real app)
//   const [notifications, setNotifications] = useState([
//     { id: 1, userName: 'John Doe', quantity: '5 kg', vegetable: 'Tomatoes', timestamp: '2 hours ago' },
//     { id: 2, userName: 'Jane Smith', quantity: '3 kg', vegetable: 'Carrots', timestamp: '1 day ago' },
//     { id: 3, userName: 'Mark Johnson', quantity: '10 kg', vegetable: 'Potatoes', timestamp: '3 days ago' },
//   ]);

//   // Function to delete a notification
//   const handleDelete = (id) => {
//     setNotifications(notifications.filter(notification => notification.id !== id));
//   };

//   return (
//     <div className="notification-page">
//       <h2>Notifications</h2>
//       {notifications.length > 0 ? (
//         <div className="notification-list">
//           {notifications.map((notification) => (
//             <div className="notification-item" key={notification.id}>
//               <div className="notification-content">
//                 <p><strong>{notification.userName}</strong> added <strong>{notification.quantity}</strong> of <strong>{notification.vegetable}</strong>.</p>
//                 <span className="timestamp">{notification.timestamp}</span>
//               </div>
//               <button className="delete-button" onClick={() => handleDelete(notification.id)}>
//                 <FaTrash className="delete-icon" />
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="no-notifications">No notifications available.</p>
//       )}
//     </div>
//   );
// };

// export default NotificationPage;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaBell } from 'react-icons/fa';
import { RiPlantLine, RiTimeLine, RiUserSmileLine } from 'react-icons/ri';
import './About.css';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, userName: 'Saman Kumara', quantity: '5 kg', vegetable: 'Tomatoes', timestamp: '2 hours ago' },
    { id: 2, userName: 'Pasindu ', quantity: '3 kg', vegetable: 'Carrots', timestamp: '1 day ago' },
    { id: 3, userName: 'kumara', quantity: '10 kg', vegetable: 'Potatoes', timestamp: '3 days ago' },
  ]);

  const handleDelete = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const NotificationCard = ({ notification }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="notification-card"
    >
      <div className="notification-header">
        <div className="user-info">
          <div className="avatar">
            <RiUserSmileLine />
          </div>
          <span className="username">{notification.userName}</span>
        </div>
        <motion.button
          className="delete-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleDelete(notification.id)}
        >
          <FaTrash />
        </motion.button>
      </div>
      
      <div className="notification-details">
        <div className="detail-item">
          <RiPlantLine className="detail-icon" />
          <span>{notification.vegetable}</span>
        </div>
        <div className="detail-item">
          <span className="quantity-badge">{notification.quantity}</span>
        </div>
      </div>
      
      <div className="notification-footer">
        <RiTimeLine className="time-icon" />
        <span className="timestamp">{notification.timestamp}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="notification-page">
      <motion.div 
        className="notification-header-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-content">
          <h2>
            <FaBell className="bell-icon" />
            Notifications
          </h2>
          <span className="notification-count">
            {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
          </span>
        </div>
      </motion.div>

      <motion.div
        className="notifications-container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="popLayout">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationCard 
                key={notification.id} 
                notification={notification} 
              />
            ))
          ) : (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="empty-icon">
                <FaBell />
              </div>
              <h3>No notifications</h3>
              <p>You're all caught up!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default NotificationPage;