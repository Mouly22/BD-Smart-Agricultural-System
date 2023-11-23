import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Businessmen_Page: React.FC = () => {
    const [userid, setUserid] = useState('');
    const [userType, setUserType] = useState('');
    useEffect(() => {
      const storedUserId = localStorage.getItem('userid');
      const storedUserType = localStorage.getItem('user_type');
      setUserid(storedUserId || '');
      setUserType(storedUserType || '');});
    return(
      <>
        <div>
          <h2>Welcome, Businessmen</h2>
          <p>User ID: {userid}</p>
          <p>User Type: {userType}</p>
        </div>

      </>
    )
  
  
  };
  
  export default Businessmen_Page;