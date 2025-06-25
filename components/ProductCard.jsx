import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProductCard({ name, price, image, recheio }) {
  return (
    <View style={styles.card}>
      {image && <Image source={image} style={styles.image} />}
      <Text style={styles.name}>{name}</Text>
      {recheio && <Text style={styles.recheio}>Recheio: {recheio}</Text>}
      <Text style={styles.price}>R$ {price}</Text>
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
});