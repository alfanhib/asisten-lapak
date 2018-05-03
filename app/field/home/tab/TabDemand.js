import React, { Component } from "react";
import { StyleSheet, Image, ScrollView, RefreshControl, AsyncStorage } from "react-native";
import { Container, Content, Fab, Icon, Text, View } from "native-base";

import axios from "axios";
import config from "../../../../config";

import Row from "../../../../components/Row";

export default class TabDemand extends Component {
  getAllData() {
    this.setState({ refreshing: true });

    AsyncStorage.getItem("objectId", (err, result) => {
      if (result) {
        axios.get(`${config.uri}/data/stores?where=status%3D'pending'%20and%20assistant_outdoor.objectId%3D'${result}'&loadRelations=available_delivery_services%2Cassistant_cs`)
          .then(stores => {
            this.setState({ stores: stores.data, refreshing: false });
          });
      }
    });
  }

  componentDidMount() {
    this.getAllData();
  }

  state = {
    refreshing: true,
    stores: []
  };

  render() {
    return (
      <Container>
        <ScrollView
          style={{ backgroundColor: "white" }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getAllData.bind(this)}
            />
          }
        >
          <Content>

            {this.state.loading == false && this.state.stores.length == 0 ? (
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                No data
              </Text>
            ) : null}

            {this.state.stores.map((store, indexes) => (
              <Row
                body={
                  <View
                    style={{
                      flexDirection: "row",
                      paddingLeft: 20,
                      paddingRight: 20
                    }}
                  >
                    <Image
                      style={styles.rowImage}
                      source={{ uri: store.logo }}
                    />
                    <View style={{ flex: 6, paddingLeft: 10 }}>
                      <Text style={styles.rowTextTitle}>{store.name}</Text>
                      <Text style={styles.rowTextAsist}>Asisten CS</Text>
                      <Text style={styles.rowTextAsistName}>{store.assistant_cs.name}</Text>
                      <Text style={styles.rowTextAddress}>{store.address}</Text>
                    </View>
                  </View>
                }
                onpress={{
                  view: () =>
                    this.props.navigation.navigate("FieldHomeProductList", {
                      objectId: store.objectId
                    })
                }}
                key={indexes}
              />
            ))}
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  rowImage: {
    resizeMode: "contain",
    flex: 2
  },
  rowTextTitle: {
    fontSize: 20,
    marginBottom: 5
  },
  rowTextAsist: {
    fontSize: 13,
    color: "#828282"
  },
  rowTextAsistName: {
    fontSize: 15,
    marginBottom: 5,
    color: "#4c4c4c"
  },
  rowTextAddress: {
    fontSize: 15,
    color: "#4c4c4c"
  }
});
