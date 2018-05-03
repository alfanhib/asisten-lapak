import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import { Form, View, Label, Item, Input } from 'native-base'
import {} from 'redux-form'

export default class TypeInput extends Component{

    render() {
      return (
        <View>
            <Label>{this.props.label}</Label>
                <Item>
                    <Input
                        name={this.props.name}
                        onChangeText={text => {this.props.input.onChange(text)}}
                        value={this.props.input.value}
                        style={styles.input}
                    />
                </Item>
        </View>
      )
    }
}

const styles = StyleSheet.create({
    input: {

    }
})