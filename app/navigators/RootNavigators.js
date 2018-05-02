import React from 'react';
import {Icon} from 'native-base';
import {StackNavigator, TabNavigator} from 'react-navigation';

import Login from '../screens/Login';

//assistant cs home
import AssistantCSHomeActive from '../assistantCS/screens/home/Active'
import AssistantCSHomePending from '../assistantCS/screens/home/Pending'

import AssistantCSTransactionFailed from '../assistantCS/screens/transactions/Failed'
import AssistantCSTransactionPending from '../assistantCS/screens/transactions/Pending'
import AssistantCSTransactionProcess from '../assistantCS/screens/transactions/Process'
import AssistantCSTransactionSuccess from '../assistantCS/screens/transactions/Success'

import AssistantCSSettings from '../assistantCS/screens/settings/Settings';

//assistant outdoor home
import AssistantOutdoorHomeActive from '../assistantOutdoor/screens/home/Active'
import AssistantOutdoorHomePending from '../assistantOutdoor/screens/home/Pending'

import AssistantOutdoorTransactionFailed from '../assistantOutdoor/screens/transactions/Failed'
import AssistantOutdoorTransactionPending from '../assistantOutdoor/screens/transactions/Pending'
import AssistantOutdoorTransactionProcess from '../assistantOutdoor/screens/transactions/Process'
import AssistantOutdoorTransactionSuccess from '../assistantOutdoor/screens/transactions/Success'

import AssistantOutdoorSettings from '../assistantCS/screens/settings/Settings';


const AssitantCSMain = TabNavigator({
  Home: {
    screen: TabNavigator({
      AssistantCSHomeActive: {
        screen: AssistantCSHomeActive,
        navigationOptions: {
          title: 'Active'
        }
      },
      AssistantCSHomePending: {
        screen: AssistantCSHomePending,
        navigationOptions: {
          title: 'Pending'
        }
      }
    }, {
      tabBarOptions: {
        indicatorStyle: {
          backgroundColor: 'white'
        },
        style: {
          backgroundColor: '#DD5453'
        }
      }
    }),
    navigationOptions: {
      title: 'Home',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon name="ios-home" style={{
          color: tintColor
        }}/>
      }
    }
  },
  Transactions: {
    screen: TabNavigator({
      AssistantCSTransactionPending:{
        screen: AssistantCSTransactionPending,
        navigationOptions: {
          title: 'Pending'
        }
      },
      AssistantCSTransactionProcess:{
        screen: AssistantCSTransactionProcess,
        navigationOptions: {
          title: 'Process'
        }
      },
      AssistantCSTransactionSuccess:{
        screen: AssistantCSTransactionSuccess,
        navigationOptions: {
          title: 'Success'
        }
      },
      AssistantCSTransactionFailed:{
        screen: AssistantCSTransactionFailed,
        navigationOptions: {
          title: 'Failed'
        }
      },
    },{
      tabBarOptions:{
        scrollEnabled: true,
        indicatorStyle: {
          backgroundColor: 'white'
        },
        style: {
          backgroundColor: '#DD5453'
        }
      }
    }),
    navigationOptions: {
      title: 'Transactions',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon name="ios-cash" style={{
          color: tintColor
        }}/>
      }
    }
  },
  AssistantCSSettings: {
    screen: AssistantCSSettings,
    navigationOptions: {
      title: 'Settings',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon name="ios-settings" style={{
          color: tintColor
        }}/>
      }
    }
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeBackgroundColor: '#B4424B',
    indicatorStyle: {
      opacity: 0
    },
    style: {
      backgroundColor: '#DD5453'
    }
  }
})

const AssitantOutdoorMain = TabNavigator({
  Home: {
    screen: TabNavigator({
      AssistantOutdoorHomeActive: {
        screen: AssistantOutdoorHomeActive,
        navigationOptions: {
          title: 'Active'
        }
      },
      AssistantOutdoorHomePending: {
        screen: AssistantOutdoorHomePending,
        navigationOptions: {
          title: 'Pending'
        }
      }
    }, {
      tabBarOptions: {
        indicatorStyle: {
          backgroundColor: 'white'
        },
        style: {
          backgroundColor: '#DD5453'
        }
      }
    }),
    navigationOptions: {
      title: 'Home',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon name="ios-home" style={{
          color: tintColor
        }}/>
      }
    }
  },
  Transactions: {
    screen: TabNavigator({
      AssistantOutdoorTransactionPending:{
        screen: AssistantOutdoorTransactionPending,
        navigationOptions: {
          title: 'Pending'
        }
      },
      AssistantOutdoorTransactionProcess:{
        screen: AssistantOutdoorTransactionProcess,
        navigationOptions: {
          title: 'Process'
        }
      },
      AssistantOutdoorTransactionSuccess:{
        screen: AssistantOutdoorTransactionSuccess,
        navigationOptions: {
          title: 'Success'
        }
      },
      AssistantOutdoorTransactionFailed:{
        screen: AssistantOutdoorTransactionFailed,
        navigationOptions: {
          title: 'Failed'
        }
      },
    },{
      tabBarOptions:{
        scrollEnabled: true,
        indicatorStyle: {
          backgroundColor: 'white'
        },
        style: {
          backgroundColor: '#DD5453'
        }
      }
    }),
    navigationOptions: {
      title: 'Transactions',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon name="ios-cash" style={{
          color: tintColor
        }}/>
      }
    }
  },
  AssistantOutdoorSettings: {
    screen: AssistantOutdoorSettings,
    navigationOptions: {
      title: 'Settings',
      tabBarIcon: ({focused, tintColor}) => {
        return <Icon name="ios-settings" style={{
          color: tintColor
        }}/>
      }
    }
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeBackgroundColor: '#B4424B',
    indicatorStyle: {
      opacity: 0
    },
    style: {
      backgroundColor: '#DD5453'
    }
  }
})

const RootNavigator = StackNavigator({
  AssitantCSMain: {
    screen: AssitantCSMain,
    navigationOptions: {
      headerTintColor:'white',
      headerStyle: {
        backgroundColor: "#DD5453",
        elevation: 0
      }
    }
  },
  AssitantOutdoorMain: {
    screen: AssitantOutdoorMain,
    navigationOptions: {
      headerTintColor:'white',
      headerStyle: {
        backgroundColor: "#DD5453",
        elevation: 0
      }
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  }
})

export default RootNavigator;