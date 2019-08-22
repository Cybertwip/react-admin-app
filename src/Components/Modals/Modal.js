import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

import UserAddEditForm from '../Forms/UserFormAddEdit'
import TaskAddEditForm from '../Forms/TaskFormAddEdit'

class ModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

      const label = this.props.buttonLabel
      const kind = this.props.buttonKind

      let button = ''
      let title = ''

      if(label === 'Edit'){
        button = <Button
                  color="warning"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Edit Item'
      } else {
        button = <Button
                  color="success"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Add New Item'
      }

      if(kind === 'User'){
        return (
          <div>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
              <ModalBody>
                <UserAddEditForm
                  addItemToState={this.props.addItemToState}
                  updateState={this.props.updateState}
                  toggle={this.toggle}
                  item={this.props.item} />
              </ModalBody>
            </Modal>
          </div>
          )
      } else {
        return (
          <div>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
              <ModalBody>
                <TaskAddEditForm
                  addItemToState={this.props.addItemToState}
                  updateState={this.props.updateState}
                  toggle={this.toggle}
                  item={this.props.item} />
              </ModalBody>
            </Modal>
          </div>
          )
      }

    
  }
}

export default ModalForm