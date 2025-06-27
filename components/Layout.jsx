import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import FloatingCart from './FloatingCart';

export default function Layout({ children, showCart = true, onCartPress }) {
  return (
    <ImageBackground
      source={require('../assets/images/coxinha.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {children}
        {showCart && <FloatingCart onPress={onCartPress} />}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems:'center', 
    justifyContent:'center',
    padding: 20,
    marginBottom:10,

   
  },


});