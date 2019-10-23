import React, { Component } from 'react'
import { Grid, Table } from 'semantic-ui-react'
import './orders.scss'
import firebase from '../../firebase'

class Orders extends Component {

  constructor (props) {
    super (props)
    this.state = {
      mobile: null,
      items: null
    }
  }

  componentDidMount () {
    var mobile = this.state.mobile;
    var db = firebase.firestore();
    db.collection("order").get().then((snapshot) => {
      var items = [];
      snapshot.docs.forEach(doc => {
        let item = doc.data();
        items.push(item)
      });
      this.setState({
        items: items
      })
    });
    if (!mobile) {
      const body = document.querySelector('body').clientWidth
      mobile = body <= 768 ? true : false
      this.setState({
        mobile: mobile
      })
    }
  }

  render () {

    const { items, mobile } = this.state

    return (
      <Grid className={'orders-container'}>
        
        <Grid.Column width={16}>

        {
          items &&
          
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Time made
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Email, Full name
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Phone number
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Address
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Size, Gender
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                items.map(item => (
                  <Table.Row key={item.name}>
                    <Table.Cell>
                      {item.timestamp}
                    </Table.Cell>
                    <Table.Cell>
                      {item.email}, {item.name}
                    </Table.Cell>
                    <Table.Cell>
                      {item.number}
                    </Table.Cell>
                    <Table.Cell>
                      {item.address}
                    </Table.Cell>
                    <Table.Cell>
                      {item.description}
                    </Table.Cell>
                    <Table.Cell>                      
                      {item.size}, {item.gender}
                    </Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
        }
        </Grid.Column>

      </Grid>
    )
  }
}

export default Orders
