import React, { Component } from 'react'
//import ReactTable from 'react-table'
import api from '../api'
import {Table,Modal} from 'antd';
import styled from 'styled-components'
import 'antd/dist/antd.css';
import './style.less';
import { EditOutlined, DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
    padding: 40px 40px 40px 40px;
`


class UpdateEmployee extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/employees/update/${this.props.id}`
    }

    render() {
        return <EditOutlined onClick={this.updateUser} style={{ color: 'blue',fontSize: "15px" }}/>
    }
}

class DeleteEmployee extends Component {
    deleteUser = event => {
        event.preventDefault()
Modal.confirm({
              title: 'Do you want to delete the employee detail permanently ?',
              icon: <ExclamationCircleOutlined />,
              okText: 'Yes',
              cancelText: 'No',
              onOk: () => {
				api.deleteEmployeeById(this.props.id);
				window.location.reload();
              },
              
            });

    }

    render() {
        return <DeleteOutlined onClick={this.deleteUser} style={{ color: 'red',fontSize: "15px" }}/>
    }
}

class EmployeesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllEmployees().then(employees => {
            this.setState({
                employees: employees.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { employees, isLoading } = this.state

        const columns = [

{
          title: 'Employee ID',
          dataIndex: 'empid',
          key: 'empid',
          align: 'center',
          render: text => <span>{text}</span>,
        },
{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          render: text => <span>{text}</span>,
        },
		
		{
          title: 'Email ID',
          dataIndex: 'emailid',
          key: 'emailid',
          align: 'center',
          render: text => <span>{text}</span>,
        },
		{
          title: 'Contact Number',
          dataIndex: 'phonenumber',
          key: 'phonenumber',
          align: 'center',
          render: text => <span>{text}</span>,
        },
		{
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
          align: 'center',
          render: text => <span>{text}</span>,
        },
{
          title: 'Action',
          dataIndex: '',
          key: '',
          render: record => <><span>
                            <DeleteEmployee id={record._id} />
                        </span>&nbsp; &nbsp;&nbsp;
 <span><UpdateEmployee id={record._id} /></span></>,
        },
		

        
]

        let showTable = true
        if (!employees.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
    <Table
                    columns={columns}
                    dataSource={employees}
className="phoenix-table"
                  />
        
        )}
            </Wrapper>
        )
    }
}

export default EmployeesList
