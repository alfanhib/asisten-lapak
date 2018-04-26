import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { Container, TabHeading,Badge, Header, Title, Content, Tab, Tabs, Text, FooterTab, Button, Icon, View, list, listItem, Body } from 'native-base';

import { TabActive, TabPending } from './tab/Main'
import Footer from '../../../components/Footer'


export default class Main extends Component {
    render() {
        return (
            <Container>
                <Tabs locked={true} initialPage={0}>
                    <Tab heading={(
                        <TabHeading>
                            <Text>Aktif</Text>
                            <Badge style={styles.badge}>
                                <Text style={styles.badgeText}>10</Text>
                            </Badge>
                        </TabHeading>
                    )}>
                        <TabActive navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading={(
                        <TabHeading>
                            <Text>Pending</Text>
                            <Badge style={styles.badge}>
                                <Text style={styles.badgeText}>10</Text>
                            </Badge>
                        </TabHeading>
                    )}>
                        <TabPending navigation={this.props.navigation} />
                    </Tab>
                </Tabs>

                <Footer data={
                    {
                        activeHome: true,
                        screenTransaction: () => this.props.navigation.navigate('CsTransaction'),
                        screenSettings: () => this.props.navigation.navigate('CsSettings'),
                    }
                } />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: 'white'
    },
    badgeText: {
        color: '#DD5453'
    }
})