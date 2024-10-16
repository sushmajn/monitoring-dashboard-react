// import React, { useContext, useEffect } from 'react';
// import {AuthContext} from '../context/AuthContext';
// import QualityControlPage from './QualityControlPage';
// import ProductionData from './ProductionPage'; 

// const Dashboard = () => {
//   const { userRole } = useContext(AuthContext);

//   useEffect(() => {
//     console.log('User Role:', userRole);
//   }, [userRole]);

//   return (
//     <>
//       {userRole === 'operator' ? (
//         <QualityControlPage /> 
//       ) : userRole === 'admin' ? (
//         <ProductionData />
//       ) 
//       : (
//         <div>You do not have access to this dashboard.</div>
//       )
//       }
//     </>
//   );
// };

// export default Dashboard;

import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import QualityControlPage from './QualityControlPage';
import ProductionData from './ProductionPage'; 

const Dashboard = () => {
  const { userRole } = useContext(AuthContext);

  return (
    <>
      {userRole === 'operator' ? (
        <QualityControlPage /> 
      ) : (
        <ProductionData /> 
      )}
    </>
  );
};

export default Dashboard;
