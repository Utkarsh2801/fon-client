import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { getProductsList, getProductDetail } from '../../services/product';
import { ReloadOutlined } from '@ant-design/icons/lib/icons';
import { ProductContext, TYPES } from "../../context/product-context";
import DetailModal from '../DetailModal/DetailModal';
import classes from "./MyProducts.module.css";
import ProductDetail from '../ProductDetail/ProductDetail';

const MyProduct = () => {
      const { productReducer, dispatch } = React.useContext(ProductContext);
      const [showModal, setShowModal] = useState(false);
      const [modalLoading, setModalLoading] = useState(false);
      const [tableLoading, setTableLoading] = useState(false);

      useEffect(() => {  
        getProducts();
      }, []);
      
      const getProducts = async () => {
        setTableLoading(true)
        let response = await getProductsList();
        if(!response.success) {
          return message.error(response.message);
        }

        message.success(response.message);
        // setProductDetails(response.data);
        dispatch({
          type: TYPES.SET_PRODUCTS,
          payload: response.data
        });

        setTableLoading(false);
      }
      
      const onClickShowProductDetails = async (productCode) => {
        setModalLoading(true);
        setShowModal(true);
        const response = await getProductDetail(productCode);

        
        if(!response.success) {
          return message.error(response.message);
        }
        
        console.log('selected etails', response.data);
        dispatch({
          type: TYPES.SELECT_PRODUCT,
          payload: {code: productCode, ...response.data}
        });
        
        setModalLoading(false);
        // message.success(response.message);
      }

      const columns = [
        {
          title: 'Code',
          dataIndex: 'code',
          key: 'code',
          render: (text) => <b>{text}</b>
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Action',
          key: 'details',
          dataIndex: 'details',
          render: (x, rowData) => (
            <>
              <Button type="primary" onClick={() => onClickShowProductDetails(rowData.code)}>Details</Button>
            </>
          ),
        },
      ];


    return (
      <>
        <Button type="primary" style={{ marginBottom : "10px"}} onClick={getProducts}><ReloadOutlined /></Button>
        <Table scroll={{y : 480}} columns={columns} dataSource={productReducer.productDetails} loading={tableLoading}/>
        {showModal && <DetailModal title="Product Details" modalLoading={modalLoading} showModal={showModal} setShowModal={setShowModal}>
          <ProductDetail details={productReducer.selectedProduct} />
        </DetailModal>}
      </>
    );
}

export default MyProduct;