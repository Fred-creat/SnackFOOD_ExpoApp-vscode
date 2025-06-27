import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Layout from '../components/Layout';

export default function HomeScreen({ navigation }) {
  return (
    <Layout onCartPress={() => navigation.navigate('Carrinho')}>
      <View style={styles.center}>
        <Text style={styles.title}>Bem-vindo à Snack FooD!</Text>
        <Text style={styles.subtitle}>O melhor cardápio de bolos, doces e salgados para você!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.buttonText}>Ver Menu</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 255, 0.6)',
    maxHeight: 190,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffa500',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});