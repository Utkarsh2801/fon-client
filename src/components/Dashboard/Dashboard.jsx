import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth-context';
import classes from "./Dashboard.module.css";

const Dashboard = (props) => {
  const { setIsLoading } =  useContext(AuthContext);  
  
    useEffect(() => {
      setIsLoading(false);
    }, []);
    
    return (
        <div className={classes.dashboard}>
      
          
        </div>
    )
}

export default Dashboard;