import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { GRAPHQL_URL } from "../../crudurl.js"

class UserAddEditForm extends React.Component {
  state = {
    id: 0,
    first: '',
    last: '',
    email: '',
    phone: '',
    location: '',
    hobby: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    var query = `mutation {
      addUser(first: "${this.state.first}", 
              last: "${this.state.last}", 
              email: "${this.state.email}", 
              phone: "${this.state.phone}",
              location: "${this.state.location}",
              hobby: "${this.state.hobby}") {
        id,
        first,
        last,
        email,
        phone,
        location,
        hobby,
        added
      }
    }`;
    
    e.preventDefault()
    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },      
      body: JSON.stringify({query: query}).replace(/\s/g,'')
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray([item.data.addUser])) {
          this.props.addItemToState([item.data.addUser][0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    var query = `mutation {
      editUser(id: ${this.state.id},
                first: "${this.state.first}", 
                last: "${this.state.last}", 
                email: "${this.state.email}", 
                phone: "${this.state.phone}",
                location: "${this.state.location}",
                hobby: "${this.state.hobby}") {
        id,
        first,
        last,
        email,
        phone,
        location,
        hobby,
        added
      }
    }`;

    e.preventDefault()
    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },      
      body: JSON.stringify({query: query}).replace(/\s/g,'')
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray([item.data.editUser])) {
          this.props.updateState([item.data.editUser][0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, first, last, email, phone, location, hobby } = this.props.item
      this.setState({ id, first, last, email, phone, location, hobby })
    }
  }

  render() {
    return (
      <Form className="submit" onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="first">First Name</Label>
          <Input type="text" name="first" id="first" onChange={this.onChange} value={this.state.first === null ? '' : this.state.first} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Last Name</Label>
          <Input type="text" name="last" id="last" onChange={this.onChange} value={this.state.last === null ? '' : this.state.last}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input type="text" name="phone" id="phone" onChange={this.onChange} value={this.state.phone === null ? '' : this.state.phone}  placeholder="ex. 555-555-5555" />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input type="text" name="location" id="location" onChange={this.onChange} value={this.state.location === null ? '' : this.state.location}  placeholder="City, State" />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Hobby</Label>
          <Input type="text" name="hobby" id="hobby" onChange={this.onChange} value={this.state.hobby}  />
        </FormGroup>
        <Button className="submit">Submit</Button>
      </Form>
    );
  }
}

export default UserAddEditForm