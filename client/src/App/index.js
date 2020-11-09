import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar,login } from '../components'
import { EmployeesList, EmployeesInsert, EmployeesUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/employees/list" exact component={EmployeesList} />
                <Route path="/" exact component={login} />
                <Route path="/employees/create" exact component={EmployeesInsert} />
                <Route
                    path="/employees/update/:id"
                    exact
                    component={EmployeesUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App
