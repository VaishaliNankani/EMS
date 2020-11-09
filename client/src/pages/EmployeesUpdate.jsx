import React, { Component } from 'react'
import api from '../api'
import {message} from 'antd';

import styled from 'styled-components'

const Title = styled.h4.attrs({
    className: 'h4',
})`color: 'blue'; font-size: "20px";margin: 10px;text-decoration:underline;`

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
    width: 60%;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`
const CancelButton = styled.button.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`


class EmployeesUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            empid: '',
            name: '',
            emailid: '',
            phonenumber: '',
            address: '',
        }
    }

    handleChangeInputEmpId = async event => {
        const empid = event.target.value
        this.setState({ empid })
    }
    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputEmailId = async event => {
        const emailid = event.target.value
        this.setState({ emailid })
    }

    handleChangeInputPhoneNumber = async event => {
        const phonenumber = event.target.value
        this.setState({ phonenumber })
    }
    
    handleChangeInputAddress = async event => {
        const address  = event.target.value
        this.setState({ address })
    }
    handleUpdateEmployee = async () => {
        const { id, empid,name, emailid, phonenumber,address } = this.state
if(this.state.empid === '' || this.state.name === '' || this.state.emailid === '' || this.state.phonenumber === '' || this.state.address === ''){
message.error('Please enter all the information');
}else if(this.state.emailid !== '')
        {
var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
if(reg.test(this.state.emailid) === false){
           return message.error('Invalid Email Address');
        }
else
{
        const payload = { empid,name, emailid,phonenumber,address }

        await api.updateEmployeeById(id, payload).then(res => {
       message.success('Employee updated successfully');
      this.setState({
                empid: '',
                name: '',
                emailid: '',
                phonenumber: '',
                address: '',
            })
        })
       window.location.href = `/employees/list`

    }
}
}
    componentDidMount = async () => {
        const { id } = this.state
        const employee = await api.getEmployeeById(id)

        this.setState({
            empid: employee.data.data.empid,
            name: employee.data.data.name,
            emailid: employee.data.data.emailid,
            phonenumber: employee.data.data.phonenumber,
            address: employee.data.data.address
        })
    }

    render() {
        const { empid,name,emailid,phonenumber, address } = this.state
        return (
            <Wrapper>
                <Title>Update Employee</Title>

                <Label>EmployeeId: </Label>
                <InputText
                    type="number"
                    value={empid}
                 readOnly={true}
                />
                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Email ID: </Label>
                <InputText
                    type="text"
                    value={emailid}
                    onChange={this.handleChangeInputEmailId}
                />

                <Label>Contact Number: </Label>
                <InputText
                    type="text"
		    maxLength="10"
                    value={phonenumber}
                    onChange={this.handleChangeInputPhoneNumber}
onKeyDown={evt => {
            if (
              [
                'alt',
                'control',
                'shift',
                'tab',
                'altgraph',
                'arrowleft',
                'arrowright',
                'capslock',
                'backspace',
                'delete',
                'comma',
                '(space)',
                // MAC
                'option',
                'command',
              ].includes(evt.key.toLowerCase())
            ) {
              return;
            }
            const allowedChars =
              '0123456789';
            if (allowedChars.indexOf(evt.key.toUpperCase()) < 0) {
              evt.preventDefault();
            }
          }}


                />

                <Label>Address: </Label>
                <InputText
                    type="text"
                    value={address}
                    onChange={this.handleChangeInputAddress}
                />

                <Button onClick={this.handleUpdateEmployee}>Update Employee</Button>
                <CancelButton onClick={()=>window.history.back()}
>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default EmployeesUpdate
