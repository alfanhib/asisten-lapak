import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native'
import { Container, Content, Icon,View,Text } from 'native-base';

import Row from '../../../../components/Row'

export default class TabDemand extends Component {
    render() {
        return (
            <Container>
                <Content style={{ margin: 10 }}>

                    <Row
                        body={(
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={styles.rowImage}
                                    source={require('../../../../assets/images/market.png')}
                                />
                                <View style={{ flex: 5, paddingLeft: 10 }}>
                                    <Text style={styles.rowTextTitle}>Els Komputer</Text>
                                    <Text style={styles.rowTextAsist}>Asisten CS</Text>
                                    <Text style={styles.rowTextAsistName}>Hafiz Joundy Syafie</Text>
                                    <Text style={styles.rowTextAddress}>JL DI Panjaitan No 128 Purwokerto</Text>
                                </View>
                            </View>
                        )}
                        onpress={{
                            view: () => this.props.navigation.navigate('FieldHomeProductList')
                        }}
                    />

                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    rowImage: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        flex: 1
    },
    rowTextTitle:{
        fontSize: 20,
        marginBottom: 5,
    },
    rowTextAsist:{  
        fontSize:13,
        color:'#828282'
    },
    rowTextAsistName:{
        fontSize:15,
        marginBottom:5,
        color:'#4c4c4c'
    },
    rowTextAddress:{
        fontSize:15,
        color:'#4c4c4c'
    }

})