import React, {Component} from 'react'
import {Container, Text} from 'native-base'

export default class Failed extends Component {
  render() {
    return (
      <Container>
        <Text>out transaction failed</Text>
      </Container>
    )
  }
}