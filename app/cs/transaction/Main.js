import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Tab,
  Tabs,
  Text,
  Body,
  Badge,
  TabHeading,
  ScrollableTab
} from "native-base";
import { TabPending, TabProcess, TabFailed, TabSuccess } from "./tab/Main";
import Footer from "../../../components/Footer";

export default class Main extends Component {
  state = {
    notification: {
      transaction: {
        pending: 10,
        process: 92,
        success: 23,
        failed: 1
      }
    }
  };

  render() {
    return (
      <Container>
        <Tabs locked={true} renderTabBar={() => <ScrollableTab />}>
          <Tab
            heading={
              <TabHeading>
                <Text>Pending</Text>
                <Badge style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {this.state.notification.transaction.pending}
                  </Text>
                </Badge>
              </TabHeading>
            }
          >
            <TabPending navigation={this.props.navigation} />
          </Tab>

          <Tab
            heading={
              <TabHeading>
                <Text>Proses</Text>
                <Badge style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {this.state.notification.transaction.process}
                  </Text>
                </Badge>
              </TabHeading>
            }
          >
            <TabProcess navigation={this.props.navigation} />
          </Tab>

          <Tab
            heading={
              <TabHeading>
                <Text>Sukses</Text>
                <Badge style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {this.state.notification.transaction.success}
                  </Text>
                </Badge>
              </TabHeading>
            }
          >
            <TabSuccess navigation={this.props.navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Gagal</Text>
                <Badge style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {this.state.notification.transaction.failed}
                  </Text>
                </Badge>
              </TabHeading>
            }
          >
            <TabFailed navigation={this.props.navigation} />
          </Tab>
        </Tabs>

        <Footer
          data={{
            activeTransaction: true,
            screenHome: () => this.props.navigation.navigate("CsHome"),
            screenSettings: () => this.props.navigation.navigate("CsSettings")
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "white"
  },
  badgeText: {
    color: "#DD5453"
  }
});
