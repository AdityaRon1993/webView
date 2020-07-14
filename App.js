// import {StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform ,StatusBar , BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previous : Date.now(),
      canGoBack : false
    }
    this.WEBVIEW_REF = React.createRef();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = ()=>{
    let returnThis = true;
    console.log(this.state.canGoBack)
    if(!this.state.canGoBack){
      const now = Date.now();
      const prev = this.state.previous;
      if((now - prev) > 1000){
        returnThis = true;
        this.setState({
          previous : Date.now() 
        })
      }else{
        returnThis = false
      }
    }
    this.WEBVIEW_REF.current.goBack();
    return returnThis;
  }

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <WebView 
          source={{ uri: 'https://techhack.co.in/' }} 
          scalesPageToFit={true}
          ref={this.WEBVIEW_REF}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
