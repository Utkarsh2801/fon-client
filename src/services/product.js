import APIS from './apis';
import http from './http';

export const createProduct = async (productDetails) => {
  const response = await http.post(`${APIS.BASE_SERVER_URL}/${APIS.ADD_PRODUCT}/`, {
    details: productDetails
  });

  console.log(response);
  return response.data.success;
};

export const getProductsList = async () => {
    const response = await http.get(`${APIS.BASE_SERVER_URL}/${APIS.GET_PRODUCTS_FOR_MANUFACTURER}/`);
    
    console.log(response);
    return response.data;
};

export const getProductDetail = async (productCode) => {
  const response = await http.get(`${APIS.BASE_SERVER_URL}/${APIS.GET_PRODUCT_DETAILS}/${productCode}`);

  console.log(response);
  return response.data;
}
