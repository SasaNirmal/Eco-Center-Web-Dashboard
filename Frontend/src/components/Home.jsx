// import React, { useState } from 'react';
// import './Home.css';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LinearScale,
//   CategoryScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { FaLeaf, FaClipboardCheck, FaTruck } from 'react-icons/fa';

// // Register the necessary components
// ChartJS.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend);

// const Home = () => {
//   const [modalContent, setModalContent] = useState(null);

//   // Sample data for the bar chart
//   const data = {
//     labels: ['Today'],
//     datasets: [
//       {
//         label: 'Total Quantity',
//         data: [150], // Data for total quantity today
//         backgroundColor: 'rgba(75, 192, 192, 0.7)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 3,
//       },
//       {
//         label: 'Order Quantity',
//         data: [70], // Data for order quantity today
//         backgroundColor: 'rgba(153, 102, 255, 0.7)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 3,
//       },
//       {
//         label: 'Available Drivers',
//         data: [5], // Data for available drivers today
//         backgroundColor: 'rgba(255, 159, 64, 0.7)',
//         borderColor: 'rgba(255, 159, 64, 1)',
//         borderWidth: 3,
//       },
//     ],
//   };

//   // Chart options
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Quantity Overview',
//         font: {
//           size: 18,
//           weight: 'bold',
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: 'rgba(0, 0, 0, 0.1)',
//         },
//         ticks: {
//           color: '#555',
//         },
//       },
//       x: {
//         grid: {
//           color: 'rgba(0, 0, 0, 0.1)',
//         },
//         ticks: {
//           color: '#555',
//         },
//       },
//     },
//   };

  

//   const closeModal = () => setModalContent(null);

//   const handleToggle = (type) => {
//     if (type === 'total') {
//       setModalContent(
//         <div>
//           <h2 className="modal-title">Total Quantity Details</h2>
//           <table className="modal-table">
//             <thead>
//               <tr>
//                 <th>Vegetable</th>
//                 <th>Quantity</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Carrots</td>
//                 <td>50</td>
//               </tr>
//               <tr>
//                 <td>Tomatoes</td>
//                 <td>30</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       );
//     } else if (type === 'order') {
//       setModalContent(
//         <div>
//           <h2 className="modal-title">Order Quantity Details</h2>
//           <table className="modal-table">
//             <thead>
//               <tr>
//                 <th>Vegetable Type</th>
//                 <th>Orders</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Potatoes</td>
//                 <td>20</td>
//               </tr>
//               <tr>
//                 <td>Onions</td>
//                 <td>15</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       );
//     } else if (type === 'drivers') {
//       setModalContent(
//         <div>
//           <h2 className="modal-title">Available Drivers</h2>
//           <table className="modal-table">
//             <thead>
//               <tr>
//                 <th>Driver Name</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>John Doe</td>
//                 <td>Available</td>
//               </tr>
//               <tr>
//                 <td>Jane Smith</td>
//                 <td>Available</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="admin-panel">
//         <div className="frame total-quantity" onClick={() => handleToggle('total')}>
//           <FaLeaf className="icon total-quantity-label" />
//           <h3>Total Quantity</h3>
//           <p>150</p>
//         </div>
//         <div className="frame order-quantity" onClick={() => handleToggle('order')}>
//           <FaClipboardCheck className="icon order-quantity-label" />
//           <h3>Order Quantity</h3>
//           <p>70</p>
//         </div>
//         <div className="frame available-drivers" onClick={() => handleToggle('drivers')}>
//           <FaTruck className="icon available-drivers-label" />
//           <h3>Available Drivers</h3>
//           <p>5</p>
//         </div>
//       </div>
//       <div className="chart-container">
//         <Bar data={data} options={options} />
//       </div>
//       {modalContent && (
//         <div className="modal-overlay" onClick={closeModal}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <span className="close-button" onClick={closeModal}>&times;</span>
//             </div>
//             {modalContent}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
        
        

// export default Home;
import React, { useState , useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion } from 'framer-motion';
import { FaLeaf, FaClipboardCheck, FaTruck, FaTimes } from 'react-icons/fa';

ChartJS.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend);

const Home = () => {
  const [modalContent, setModalContent] = useState(null);
  const [driverNames, setDriverNames] = useState([]);
  const [vegetableData, setVegetableData] = useState([]);

  useEffect(() => {
    // Fetch driver names from backend
    const fetchDriverNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/drivers/all-drivers');
        setDriverNames(response.data.map(driver => driver.name));
      } catch (error) {
        console.error('Error fetching driver names:', error);
      }
    };
    fetchDriverNames();
  }, []);

  useEffect(() => {
    // Fetch vegetable names and quantities from backend
    const fetchVegetableData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/nortification/aletveg');
        setVegetableData(response.data);
      } catch (error) {
        console.error('Error fetching vegetable data:', error);
      }
    };
    fetchVegetableData();
  }, []);



  const data = {
    labels: ['Today'],
    datasets: [
      {
        label: 'Total Quantity',
        data: [150],
        backgroundColor: 'rgba(111, 232, 255, 0.8)',
        borderColor: 'rgba(111, 232, 255, 1)',
        borderWidth: 2,
      },
      {
        label: 'Order Quantity',
        data: [70],
        backgroundColor: 'rgba(130, 110, 255, 0.8)',
        borderColor: 'rgba(130, 110, 255, 1)',
        borderWidth: 2,
      },
      {
        label: 'Available Drivers',
        data: [5],
        backgroundColor: 'rgba(255, 136, 255, 0.8)',
        borderColor: 'rgba(255, 136, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Quantity Overview',
        font: {
          family: "'Inter', sans-serif",
          size: 20,
          weight: '600',
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
          },
          color: '#fff',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
          },
          color: '#fff',
        },
      },
    },
  };

  const closeModal = () => setModalContent(null);

  const handleToggle = (type) => {
    const modalData = {
      total: {
        title: 'Total Quantity Details',
        headers: ['Vegetable', 'Quantity'],
        rows: vegetableData.map(veg => [veg.name, veg.quantity]), 
      },
      order: {
        title: 'Order Quantity Details',
        headers: ['Vegetable Type', 'Orders'],
        rows: [
          ['Potatoes', '20'],
          ['Onions', '15'],
        ],
      },
      drivers: {
        title: 'Available Drivers',
        headers: ['Driver Name', 'Status'],
        rows: driverNames.map(name => [name, 'Available']),
      },
    };

    const selected = modalData[type];
    
    setModalContent(
      <div className="modal-inner">
        <h2 className="modal-title">{selected.title}</h2>
        <table className="modal-table">
          <thead>
            <tr>
              {selected.headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selected.rows.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  return (
    <div className="home-container">
     
      <div className="admin-panel">
        <motion.div
          className="frame total-quantity"
          onClick={() => handleToggle('total')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="frame-content">
            <FaLeaf className="icon" />
            <div className="frame-text">
              <h3>Total Quantity</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="frame order-quantity"
          onClick={() => handleToggle('order')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="frame-content">
            <FaClipboardCheck className="icon" />
            <div className="frame-text">
              <h3>Order Quantity</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="frame available-drivers"
          onClick={() => handleToggle('drivers')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="frame-content">
            <FaTruck className="icon" />
            <div className="frame-text">
              <h3>Available Drivers</h3>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="chart-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Bar data={data} options={options} />
      </motion.div>

      {modalContent && (
        <motion.div
          className="modal-overlay"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button className="close-button" onClick={closeModal}>
              <FaTimes />
            </button>
            {modalContent}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;