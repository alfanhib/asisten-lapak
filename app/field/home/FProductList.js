import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  RefreshControl,
  ScrollView,
  AsyncStorage,
  Alert
} from "react-native";
import {
  Container,
  Title,
  Content,
  Text,
  Icon,
  Fab,
  Card,
  CardItem,
  Body,
  Label,
  Button,
  Spinner
} from "native-base";
import axios from "axios";

import config from "../../../config";
import Footer from "../../../components/Footer";
import Row from "../../../components/Row";

export default class FProductList extends Component {
  state = {
    refreshing: true,
    loading: true,
    stores: [],
    products: []
  };

  getAllData() {
    this.setState({ refreshing: true });

    const objectId = this.props.navigation.state.params.objectId;

    AsyncStorage.getItem("objectId", (err, result) => {
      if (result) {
        // alert(result);
        axios
          .get(
            `${
              config.uri
            }/data/stores?where=status%20%3D%20'pending'&loadRelations=assistant_outdoor%2Cassistant_cs&where=assistant_outdoor.objectId%20%3D%20'${result}'&where=objectId%20%3D%20'${objectId}'`
          )
          .then(stores => {
            this.setState({
              stores: stores.data,
              refreshing: false,
              loading: false
            });
          });
      }
    });
  }

  getAllProduct() {
    const objectId = this.props.navigation.state.params.objectId;

    this.setState({ refreshing: true });

    axios
      .get(
        `${
          config.uri
        }/data/products?where=store.objectId%20%3D%20'${objectId}'&loadRelations=store`
      )
      .then(result => {
        if (result.data) {
          this.setState({
            products: result.data,
            refreshing: false,
            loading: false
          });
        }
      });
  }

  componentDidMount() {
    this.getAllData();
    this.getAllProduct();
    const tt = this.props.navigation.state.params.assistant;
    console.log(this.props.navigation.state.params);
  }

  activateStore() {
    objectId = this.props.navigation.state.params.objectId;

    axios
      .put(
        `${config.uri}/data/bulk/stores?where=objectId%20%3D%20'${objectId}'`,
        {
          status: "active"
        }
      )
      .then(result => {
        if (result.data) {
          Alert.alert(
            "",
            "Store status has been changed!",
            [
              {
                text: "OK",
                onPress: () => this.props.navigation.goBack()
              }
            ],
            { cancelable: false }
          );
        }
      });
  }

  render() {
    return (
      <Container>
        <ScrollView
          style={{ backgroundColor: "white" }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.getAllProduct.bind(this)}
            />
          }
        >
          <Content style={{ backgroundColor: "white" }}>
            {this.state.stores.map((store, indexes) => (
              <View key={indexes}>
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
                        <Text style={styles.rowSlogan}>"{store.slogan}"</Text>
                        <Text style={styles.rowTextAsistName}>
                          Customer: {store.assistant_cs.name}
                        </Text>
                        <Text style={styles.rowTextAsistName}>
                          Outdoor: {store.assistant_outdoor.name}
                        </Text>
                        <Text style={styles.rowTextAddress}>
                          Alamat: {store.address}
                        </Text>
                        <Text style={styles.rowWebsite}>
                          Website: {store.website}
                        </Text>
                        <Text style={styles.rowDescription}>
                          Deskripsi: {store.description}
                        </Text>
                        {this.props.navigation.state.params.storeStatus ==
                        "active" ? null : (
                          <Button
                            full
                            onPress={() => this.actisvateStore()}
                            style={{
                              backgroundColor: "#b4424b",
                              marginTop: 20
                            }}
                          >
                            <Text>Aktifkan Toko</Text>
                          </Button>
                        )}
                      </View>
                    </View>
                  }
                />

                <Row
                  body={
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignSelf: "center",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <View>
                        <Text style={{ textAlign: "center" }}>
                          Product List
                        </Text>
                      </View>
                    </View>
                  }
                />
              </View>
            ))}

            {this.state.loading == false && this.state.products.length == 0 ? (
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                Product is not available
              </Text>
            ) : (
              this.state.products.map((product, indexes) => (
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
                        source={{ uri: product.image }}
                      />
                      <View style={{ flex: 6, paddingLeft: 10 }}>
                        <Text style={styles.rowTextTitle}>{product.name}</Text>
                        <Text style={styles.rowTextAsist}>
                          Rp. {product.price}
                        </Text>
                        <Text style={styles.rowTextAsistName}>
                          {product.weight} Kg
                        </Text>
                        <Text style={styles.rowTextAddress}>
                          {product.description}
                        </Text>
                      </View>
                    </View>
                  }
                  key={indexes}
                />
              ))
            )}
          </Content>
        </ScrollView>
        <Fab
          style={{ bottom: 60, backgroundColor: "#DD5453" }}
          onPress={() =>
            this.props.navigation.navigate("FieldHomeAddProduct", {
              objectId: this.props.navigation.state.params.objectId
            })
          }
        >
          <Icon name="add" />
        </Fab>

        <Footer
          data={{
            activeHome: true,
            screenTransaction: () =>
              this.props.navigation.navigate("FieldTransaction"),
            screenSettings: () =>
              this.props.navigation.navigate("FieldSettings")
          }}
        />
      </Container>
    );
  }
}
("");

const styles = StyleSheet.create({
  rowTextCondition: {
    fontSize: 15,
    color: "#4c4c4c",
    flex: 2,
    alignSelf: "flex-start"
  },
  rowTextPrice: {
    fontSize: 15,
    color: "#4c4c4c",
    flex: 2,
    alignSelf: "flex-start"
  },

  rowImage: {
    resizeMode: "contain",
    flex: 2
  },
  rowTextTitle: {
    fontSize: 20,
    marginBottom: 5,
    alignSelf: "flex-start"
  },
  rowTextAsist: {
    fontSize: 13,
    color: "#828282",
    alignSelf: "flex-start"
  },
  rowTextAsistName: {
    fontSize: 15,
    marginBottom: 5,
    color: "#4c4c4c",
    alignSelf: "flex-start"
  },
  rowTextAddress: {
    fontSize: 15,
    color: "#4c4c4c",
    alignSelf: "flex-start"
  },

  rowSlogan: {
    fontSize: 15,
    marginBottom: 5,
    color: "#4c4c4c",
    alignSelf: "flex-start"
  },

  rowWebsite: {
    fontSize: 15,
    marginBottom: 5,
    color: "#4c4c4c",
    alignSelf: "flex-start"
  },

  rowDescription: {
    fontSize: 15,
    color: "#828282",
    alignSelf: "flex-start"
  }
});
