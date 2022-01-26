import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import { createProduct } from '../../services/product';
// import { ProductContext, TYPES } from '../../context/product-context';

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Property',
        dataIndex: 'property',
        width: '30%',
        editable: true,
      },
      {
        title: 'Value',
        dataIndex: 'value',
        editable : true
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [

      ],
      count: 0,
      isLoading : false
    };
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
      count : this.state.count - 1
    });
  };
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
    key : count,
      property: `Property ${count}`,
      value : `Value ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  createProduct = async () => {
    this.setState({
      isLoading : true
    })
    const productDetails = this.state.dataSource;
    const productObject = {};

    const isValid = Object.keys(productDetails).find(productIndex => (productDetails[productIndex].property.toLowerCase() === 'name'));
    
    if(!isValid) {
      this.setState({
        isLoading : false
      })
      return message.error("Please add  'name' of the product");
    }

    Object.keys(productDetails).forEach(productIndex => {
      productObject[productDetails[productIndex].property] = productDetails[productIndex].value
    });

    console.log(productObject);
    const response = await createProduct(productObject)
    if(response) {
      // dispatch({
      //   type: TYPES.ADD_PRODUCT,
      //   action: productObject.data
      // })
      message.success('Product Added Successfully');
      this.setState({
        dataSource : [],
        count : 0,
      })
    }
    else message.error('Something Went Wrong');

    this.setState({
      isLoading : false
    })
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          New Property <PlusOutlined />
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          scroll={{y : 400}}
          pagination={false}
          loading={this.state.isLoading}
        />
        <div style={{marginTop : "20px", textAlign: "right"}}><Button type="primary" onClick={this.createProduct}>Submit</Button></div>
      </div>
    );
  }
}

export default AddProduct;