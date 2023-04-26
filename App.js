/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component, useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Form,
  TextInput,
} from 'react-native';
import axios from 'axios';
import Article from './Article';
const APIKEY = 'pCfdM4Axk9h4PIGR7lBt7xRZaGbAckpA';
const topStoryUrl =
  'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=' + APIKEY;
const searchUrl = 
  'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      status: 'loading',
      query: '',
      filter: '',
      errorMsg: '',
    };
    this.getDatfromUrl = this.getDatfromUrl.bind(this);
  }
  componentDidMount() {
    this.getDatfromUrl(topStoryUrl);
  }
  async getDatfromUrl(url) {
    console.log(url);
    try {
      await axios
      .get(url)
      .then(response => {
        console.log('response');
        if (url === topStoryUrl) {
          const results = response.data.results;
          const articles = results.map(result => {
            return {
              title: result.title,
              abstract: result.abstract,
            };});
          this.setState({data: articles});
        } else {
            const results = response.data.response.docs;
            const articles = results.map(result => {
              return {
                title: result.headline.main,
                abstract: result.abstract,
              };});
            this.setState({data: articles});
          }
        this.setState({status: 'loaded'});
      })
      .catch(error => {
        this.setState({errorMsg: error.message});
        this.setState({status: 'error'});
      });
    } catch (error) {
      console.log(error);
      console.log('error to call axios');
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query || prevState.filter !== this.state.filter) {
      const url = searchUrl + this.state.query +"&fq=" + this.state.filter + "&api-key="+ APIKEY;
      if (this.state.status === 'loading') {
        return;
      } else if (this.state.status === 'loaded') {
        this.setState({status: 'loading'});
        this.getDatfromUrl(url);
      } else {
        this.setState({status: 'loaded'});
        console.log("Error");
      }
    } else {
      console.log("No change");
    }
  }
  
  render() {
    return (
      <View>
        <TextInput
          keyboardType = "default"
          placeholder = "Search"
          name= "query"
          onChangeText={query => this.setState({query:query})}
          value={this.state.query}
        />
        <TextInput
          placeholder = "Filter"
          name= "filter"
          onChangeText={filter => this.setState({filter:filter})}
          value={this.state.filter}
        />
        <Text style= {styles.text}>New York Times</Text>
        {
          this.state.status === 'loaded' ? (
            <FlatList
              contentContainerStyle={styles.contentContainer}
              horizontal={false}
              data={this.state.data}
              renderItem={({item}) => <Article props={item} />}
            />
          ) : this.state.status === 'error' ? (
            <Text style= {styles.errorText}>{this.state.errorMsg}</Text>
          ) : (
            <Text style= {styles.errorText}>Loading</Text>
          )
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    backgroundColor: '#3b3a30',
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
  contentContainer: {
    paddingVertical: 20,
    padding:16,
    backgroundColor:"black"
  }
});
export default App;
