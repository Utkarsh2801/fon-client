import React, { useContext, useEffect } from 'react';
import { LogoutOutlined } from '@ant-design/icons/lib/icons';
import { AuthContext } from '../../context/auth-context';
import classes from "./Dashboard.module.css";
import DashboardTab from '../DashboardTabs/DashboardTabs';
import AddProduct from '../AddProduct/AddProduct';
import MyProducts from '../MyProducts/MyProducts';

const Dashboard = (props) => {
  const { setIsLoading, logout } =  useContext(AuthContext);  
  
    useEffect(() => {
      setIsLoading(false);
    }, []);
    
    const onClickLogoutButton = () => {
      logout();
    }

    return (
        <div className={classes.dashboard}>
          <div className={classes.navigation} style={{backgroundColor : "rgba(50, 82, 205, 0.8)"}}>
                <button className={classes.logout}>
                    <LogoutOutlined onClick={onClickLogoutButton} style={{fontSize : 20}} />
                </button>
          </div>
        
          <div style={{padding : "20px"}}>
            <DashboardTab 
              tabs = {[['My Products', <MyProducts />], ['Add Product', <AddProduct />]]}
            />
          </div>
          
        </div>
    )
}

export default Dashboard;