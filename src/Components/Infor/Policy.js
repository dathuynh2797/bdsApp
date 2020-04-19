import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {CustomHeader} from '../CustomHeader';

export class Policy extends Component {
  render() {
    return (
      <SafeAreaView style={styles.MenuContainer}>
        <CustomHeader
          title="Chính Sách Công Ty"
          navigation={this.props.navigation}
        />
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Qdctp');
            }}>
            <View style={styles.TabMenu}>
              <Text style={styles.Text}>Quy định công tác phí</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Cdlt');
            }}>
            <View style={styles.TabMenu}>
              <Text style={styles.Text}>Chế độ lương thưởng</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Lnl');
            }}>
            <View style={styles.TabMenu}>
              <Text style={styles.Text}>Lịch nghỉ lễ</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Bnns');
            }}>
            <View style={styles.TabMenu}>
              <Text style={styles.Text}>Bổ nhiệm nhân sự</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.Col}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Hdtb');
            }}>
            <View style={styles.TabMenu}>
              <Text style={styles.Text}>Hoạt động team building</Text>
              <Text />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MenuContainer: {
    flex: 1,
    //justifyContent: 'center',
    //flexDirection: 'column',
    //alignItems: 'center',
    //backgroundColor: 'grey',
  },
  Col: {
    //flex: 1,
    //flexDirection: 'row',
    height: 70,
    margin: 1,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#1787AB',
    justifyContent: 'center',
  },
  TabMenu: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  Iconstyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    height: 50,
    width: 50,
    backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 1,
  },
  Icon: {
    height: 50,
    width: 50,
  },
  Text: {
    color: 'white',
    fontStyle: 'normal',
    // fontFamily: 'Roboto',
    fontWeight: '900',
    fontSize: 20,
    lineHeight: 23,
    alignSelf: 'center',
  },
  btnGo: {
    //color: 'white',
    fontSize: 18,
  },
});