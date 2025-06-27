import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "./CartContext";

export default function FloatingCart({ onPress }) {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => {
    // Garante que o preço é número
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(',', '.')) : item.price;
    return sum + (price * item.qty);
  }, 0);

  if (totalItems === 0) return null;

  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Text style={styles.text}>🛒 {totalItems} | R$ {totalPrice.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#2e7d32",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
    zIndex: 100,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
