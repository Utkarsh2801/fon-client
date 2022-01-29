import { Button } from 'antd';
import React, { useState } from 'react';
import classes from "./ProductDetail.module.css";
import { DownloadOutlined } from '@ant-design/icons/lib/icons';
import apis from '../../services/apis';
import { ProductContext } from '../../context/product-context';


const ProductDetail = ({ details: productDetails }) => {
    const [imageUrl, setimageUrl] = useState("");
    const { productReducer } = React.useContext(ProductContext);
    const [qrurl, setqrurl] = useState("");

    console.log(productReducer.selectedProduct);
    console.log({ productDetails });

    const getQRCode = async () => {
        let response = await fetch(`${apis.BASE_SERVER_URL}/${apis.GET_QR_CODE}/${productReducer.selectedProduct.code}`, {
            method : 'GET',
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`,
                'userid' : localStorage.getItem('userId')
            }
        });
      
        let reader = response.body.getReader();
        let done, value;
        let chunks = [];
        while(!done) {
            ({value, done} = await reader.read());
        
            if(done) {
                break;
            } else {
                chunks.push(value);
            }
        }
        console.log(chunks);
        let blob = new Blob(chunks, {type: 'application/octet-stream'});
        let url = window.URL.createObjectURL(blob);
        setqrurl(url);
    }

    const downloadQRCode = async () => {   
        var anchor = document.createElement("a");
        anchor.download = `${productReducer.selectedProduct.code}.png`;
        anchor.href = qrurl;
        anchor.click();
    }

    
    return (
        <div className={classes.details}>
            <div className={classes.properties}>
                <h2>Details</h2>
                 {Object.entries(productDetails.details).map(([property, value], index) => (<p key={index}>{property} - {value}</p>))}
            </div>
            <div className={classes.qrbox}>
                <div>
                    {qrurl.length === 0 ? <img src={require('../../assets/qrbg.jpg')} alt="" height="300" width="300"/> :
                        <img src={qrurl} alt="" height="300" width="300"/>
                    }
                    <div style={{textAlign : "center", marginTop : "10px"}}>
                    {qrurl.length === 0 ? <Button type="primary" style={{marginRight : "10px"}} onClick={() => getQRCode()}>Show QR Code</Button> :
                    <Button type="primary" onClick={() => downloadQRCode()}>Download <DownloadOutlined /></Button> }
                    </div>
                </div>
            </div>
                
            </div>
    )
}

export default ProductDetail;