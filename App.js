import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {LoginScreen} from './src/pages/LoginScreen';
import {HomeScreen} from './src/pages/HomeScreen';
import {InforScreen} from './src/pages/Home/InforScreen';
import {Policy} from './src/pages/Infor/Policy';
import {Personel} from './src/pages/Infor/Personel';
import {Ogchart} from './src/pages/Infor/Ogchart';
import {ForgotPassword} from './src/pages/ForgotPassword';
import {ProjectScreen} from './src/pages/Project/ProjectScreen';
// import {ProjectDetails} from './src/pages/Project/ProjectDetails';

const AppNavigator = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    HomeScreen: HomeScreen,
    InforScreen: InforScreen,
    Policy: Policy,
    Personel: Personel,
    Ogchart: Ogchart,
    ForgotPassword: ForgotPassword,
    ProjectScreen: ProjectScreen,
    // ProjectDetails: ProjectDetails,
  },
  {
    initialRouteName: 'HomeScreen',
  },
);

// const ProjectStack = createStackNavigator({});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
