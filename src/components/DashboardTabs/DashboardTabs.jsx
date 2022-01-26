import React from 'react';
import classes from './DashboardTabs.module.css'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const DashboardTabs = ({ tabs, ...props }) => {
    return (
        <Tabs type="card">  
            {tabs.map((tab, index) => {
              // console.log(tab);
              return (<TabPane tab={tab[0]} key={index}>
                {tab[1]}
              </TabPane>)
            })}
        </Tabs>
    )
}

export default DashboardTabs;