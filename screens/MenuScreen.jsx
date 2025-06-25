import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

const productsMenu = [
  { name: "Bolos" },
  { name: "Doces" },
  { name: "Salgados" },
];

// Exemplo de cardápios (substitua pelos seus arrays reais)
const bolos = [
  {
    name: "Bolo de 15cm ",
    recheio: "coco, morango atificial,brigadeiro,chocolate",
    price: "110,00",
    image: require("../assets/images/bolo.png"),
  },
  {
    name: "Bolo de 20cm  ",
    recheio: "coco, morango atificial,brigadeiro,chocolate",
    price: " 170,00 ",
    image: require("../assets/images/bolo.png"),
  },
  {
    name: "Bolo de 25",
    recheio: "coco, morango atificial,brigadeiro,chocolate",
    price: " 210,00 ",
    image: require("../assets/images/bolo.png"),
  },
  {
    name: "Bolo de 30",
    recheio: "coco, morango atificial,brigadeiro,chocolate",
    price: " 270,00 ",
    image: require("../assets/images/bolo.png"),
  },
  // ... outros bolos
];
const doces = [
  {
    name: "Trufas-100un",
    price: "100,00",
    image: require("../assets/images/trufas.png"),
  },
  {
    name: "Brigadeiro-100un",
    price: "100,00",
    image: require("../assets/images/brigadeiro.png"),
  },
  {
    name: "Beijinhos-100un",
    price: "100,00",
    image: require("../assets/images/beijinhos.png"),
  },
  {
    name: "Casadinho-100un",
    price: "100,00",
    image: require("../assets/images/casadinho.png"),
  },
  {
    name: "Cajuzinho-100un",
    price: " 100,00 ",
    image: require("../assets/images/cajuzinho.png"),
  },
  {
    name: "Moranguinho-100un",
    price: " 100,00 ",
    image: require("../assets/images/moranguinho.png"),
  },
  {
    name: "Uva Encapada-100un",
    price: " 100,00 ",
    image: require("../assets/images/uva-encapada.png"),
  },
  {
    name: "Cerejinha-100un",
    price: " 100,00 ",
    image: require("../assets/images/cerejinnha.png"),
  },
  

  // ... outros doces
];
const salgados = [
  {
    name: "Coxinha",
    price: "1,10 unid.",
    image: require("../assets/images/coxinha.png"),
  },
  {
    name: "Pastel",
    price: "1,10 unid.",
    image: require("../assets/images/pastel.png"),
  },
  {
    name: "Bolinha de Queijo",
    price: "1,10 unid.",
    image: require("../assets/images/bolinha-queijo.png"),
  },
  { name: "Kibe", price: "1,10", image: require("../assets/images/kibe.png") },
  {
    name: "Enroladinho",
    price: "1,10 unid.",
    image: require("../assets/images/enroladinho.png"),
  },
  {
    name: "Camarão Empanado",
    price: "1,50 unid.",
    image: require("../assets/images/camarao-empanado.png"),
  },
];

export default function MenuScreen() {
  const [selectedMenu, setSelectedMenu] = useState(null);

  let productsToShow = [];
  if (selectedMenu === "Bolos") productsToShow = bolos;
  else if (selectedMenu === "Doces") productsToShow = doces;
  else if (selectedMenu === "Salgados") productsToShow = salgados;

  return (
    <Layout>
      {!selectedMenu ? (
        <View>
          <Text style={styles.titlecardapio}>Cardápios:</Text>
          <View style={styles.menuContainer}>
            {productsMenu.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => setSelectedMenu(item.name)}
              >
                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <ScrollView>
          {productsToShow.map((item, index) => (
            <ProductCard
              key={index}
              name={item.name}
              recheio={item.recheio}
              price={item.price}
              image={item.image}
            />
          ))}
          <TouchableOpacity
            onPress={() => setSelectedMenu(null)}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Voltar ao Menu</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </Layout>
  );
}
const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "space-around",

    textAlign: "center",
    width: 130,
    height: 80,
  },

  titlecardapio: {
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
    fontSize: 40,
    backgroundColor: "rgba(0, 0, 255, 0.30)",

    borderRadius: 10,
  },
  menuImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  menuText: {
    textAlign: "center",
    fontSize: 25,
    width: 120,
    height: 30,
    borderRadius: 10,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "rgba(0, 0, 255, 0.6)",
  },
  backButton: {
    margin: 20,
    padding: 10,
    backgroundColor: "#ffa500",
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
