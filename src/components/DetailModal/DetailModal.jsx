import React, { useState } from 'react';
import { Modal, Button, Spin } from 'antd';
import classes from "./DetailModal.module.css";


const DetailModal = ({ title, showModal, setShowModal, modalLoading, ...props }) => {

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal title={title} visible={showModal} footer={null} width={1200} onCancel={handleCancel}>
        {modalLoading && <div className={classes.loader}>
            <Spin size="large" />
        </div>}
        {!modalLoading && props.children}
      </Modal>
    </>
  );
};

export default DetailModal;