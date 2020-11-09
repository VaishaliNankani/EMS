import React, { Component } from 'react'
import api from '../api'
import {message} from 'antd';

import styled from 'styled-components'

const Title = styled.h5.attrs({
    className: 'h4',
})`color: 'blue'; font-size: "20px";margin: 10px;text-decoration:underline; `

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
    margin: 5px ;
    width: 60%;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class EmployeesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            empid: '',
            name: '',
            emailid: '',
            phonenumber: '',
            address: '',
            errors: {}
        }
    }

    handleChangeEmpId= async event => {
        const empid = event.target.value
        this.setState({ empid})
    }
    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputEmailId = async event => {
        const emailid = event.target.value;
        this.setState({ emailid });
 		}

    handleChangeInputPhoneNumber = async event => {
        const phonenumber = event.target.value
        this.setState({ phonenumber })
    }

    handleChangeInputAddress = async event => {
        const address = event.target.value
        this.setState({address})
    }

validate(){
      let errors = {};
      let isValid = true;
  
      if (this.state.name) {
        isValid = false;
        errors["name"] = "Please enter your name.";
      }
  
      if (this.state.emailid) {
        isValid = false;
        errors["email"] = "Please enter your email Address.";
      }
  
      if (typeof this.state.emailid !== "undefined") {
          
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.email)) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }
  
      if (!this.state.phonenumber) {
        isValid = false;
        errors["phone"] = "Please enter your phone number.";
      }
  
      if (typeof this.state.phonenumber!== "undefined") {
          
        pattern = new RegExp(/^[0-9\b]+$/);
        if (!pattern.test(this.state.phonenumber)) {
          isValid = false;
          errors["phone"] = "Please enter only number.";
        }else if(this.state.phonenumber.length !== 10){
          isValid = false;
          errors["phone"] = "Please enter valid phone number.";
        }
      }
  
      this.setState({
        errors: errors
      });
  
      return isValid;
  }

    handleIncludeEmployee = async () => {
        const { empid,name, emailid, phonenumber,address } = this.state
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

        const payload = { empid,name, emailid, phonenumber,address }
        await api.insertEmployee(payload).then(res => {
        message.success('Employee inserted successfully');            
        this.setState({
                id: '',
                empid: '',
                name: '',
                emailid: '',
                phonenumber: '',
                address: '',
                errors: {},
            })
        })
    }
 }
   }

    render() {
        const { empid,name, emailid, phonenumber,address } = this.state
        return (
            <Wrapper>
                <Title>Create Employee </Title>
                <Label>Employee Id: </Label>
                <InputText
                    type="text"
                    value={empid}
                    onChange={this.handleChangeEmpId}
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
                <Button onClick={this.handleIncludeEmployee}>Add Employee</Button>
                <CancelButton href={'/employees/create'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default EmployeesInsert
