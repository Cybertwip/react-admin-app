import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import UserDataTable from './../Components/Tables/UserDataTable'
import TaskDataTable from './../Components/Tables/TaskDataTable'
import ModalForm from './../Components/Modals/Modal'

import { CRUD_URL_TASKS } from "./../crudurl.js"
import { GRAPHQL_URL } from "./../crudurl.js"

class Crud extends Component {


  constructor(props) {
    super(props);

    this.state = {
      items: [],
      kind: 'User', // can be Task
      kindText: 'Users',
      switchTableText: 'Users'
    }
  }

  getItems(){
    if(this.state.kind === 'User'){

      var query = `
      {
        users {
          id,
          first,
          last,
          email,
          phone,
          location,
          hobby,
          added
        }
      }
      `;

      fetch(GRAPHQL_URL, {
        crossDomain:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query: query})
      })
        .then(response => response.json())
        .then(items => {
          this.setState({items: items.data.users})
        })
        .catch(err => console.log(err))
  
    } else {
      fetch(CRUD_URL_TASKS, {
        crossDomain:true,
        method: 'GET',
        headers: {'Content-Type':'application/json'}
      })
        .then(response => response.json())
        .then(items => this.setState({items}))
        .catch(err => console.log(err))
  
    }
  }

  addItemToState = (item) => {
    this.setState((prevState) => {
      if(prevState.items.hasOwnProperty("dataExists")){
        return{ items: [] }
      }
      else{
        return{ items: [...prevState.items, item] }
      }
    })
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
  }

  switchKind(newKind){
    let kindText = newKind ==='User'? 'Users' : 'Tasks'
    this.setState({ items: [], kind: newKind, kindText: kindText, switchTableText: kindText }, function(){
      this.getItems()
    })
  }

  render() {

    let dataTable = this.state.kind === 'User' ? 
    <UserDataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
    :
    <TaskDataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />

    let modal = this.state.kind === 'User' ?
    <ModalForm buttonKind="User" buttonLabel="Add Item" addItemToState={this.addItemToState}/>
    :
    <ModalForm buttonKind="Task" buttonLabel="Add Item" addItemToState={this.addItemToState}/>


    return (
      <div>
        <Row>
          <Col>
          <h1 style={{margin: "20px 0"}}>CRUD Database - {this.state.kindText}</h1>
          
          <UncontrolledDropdown>
            <DropdownToggle caret>
              {this.state.switchTableText}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => {this.switchKind('User')}}>Users</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => {this.switchKind('Task')}}>Tasks</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          
          </Col>
        </Row>
        <Row>
          <Col>
            {dataTable}
          </Col>
        </Row>
        <Row>
          <Col>
            {modal}
          </Col>
        </Row>
      </div>
    )


    

  }
}

export default Crud