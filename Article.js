import React, {useState, Comp, Component} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
function Article({props}) {
  return (
    <SafeAreaView>
      <View style = {styles.view}>
        <Text style = {styles.title}>{props.title}</Text>
        <Text style = {styles.content}>{props.abstract}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    blackgroundColor: 'white',
    marginEnd: 10,
    marginStart: 10,
    zIndex: 1,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    color: 'gray',
    textAlign: 'left',
  },
});
export default Article;


