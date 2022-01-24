import React from 'react';
import { Spin } from 'antd';

import classes from './loading.module.css';

const Loading = () => {
  return (
    <div className={classes.loading}>
       <Spin size="large" />
       <h3>Loading...</h3>
    </div>
  );
}
  
export default Loading;
  