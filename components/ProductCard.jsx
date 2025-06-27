import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useCart } from './CartContext';

export default function ProductCard({ name, price, image, recheio }) {
  const { addToCart } = useCart();
  return (
    <View style={styles.card}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.name}>{name}</Text>
      {recheio && <Text style={styles.recheio}>Recheio: {recheio}</Text>}
      <Text style={styles.price}>R$ {price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => addToCart({ name, price, image, recheio })}>
        <Text style={styles.buttonText}>Adicionar ao carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(203, 204, 189, 0.8)',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recheio: {
    fontSize: 15,
    color: '#333',
    marginTop: 3,
    marginBottom: 3,
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});