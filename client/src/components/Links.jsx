import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
constructor(props) {
        super(props)

        this.state = {
            login:false,
        }
    
}
componentDidMount(){
      if(sessionStorage && sessionStorage.getItem('login')){
            this.setState({login: sessionStorage.getItem('login')});
}
}

      handleLogout =()=>{
window.location.href = "/";
}       
    render() {
      console.log("hello",this.state.login,window.location.pathname);
 return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                   <h3 style={{color:'white', marginLeft:'40px'}}> EMS</h3>
                </Link>
                <Collapse>
{(this.state.login &&  window.location.pathname !== '/')  ? (

                    <List>
                        <Item>
                            <Link to="/employees/list" className="nav-link" style={{fontSize: '16px',fontWeight: 'bold' ,color:'white', marginLeft:'10px'}}>
                                List Employees
                            </Link>
                        </Item>&nbsp;&nbsp;&nbsp;
                        <Item>
                            <Link to="/employees/create" className="nav-link" style={{fontSize: '16px',fontWeight: 'bold',color:'white', marginLeft:'10px'}}>
                                Add Employee
                            </Link>
                        </Item>
                        <Item style={{position: 'relative', left: '160%'}}>
                            <Link  onClick={this.handleLogout}  className="nav-link" style={{fontSize: '16px',color:'white', marginLeft:'10px'}}>
                                Logout
                            </Link>
                        </Item>
                    </List>) : null }
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
