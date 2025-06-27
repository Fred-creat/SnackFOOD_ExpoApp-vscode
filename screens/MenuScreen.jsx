import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
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

export default function MenuScreen({ navigation }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [bolosData, setBolosData] = useState([]);
  const [docesData, setDocesData] = useState([]);
  const [salgadosData, setSalgadosData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/bolos`)
      .then((res) => res.json())
      .then((data) => setBolosData(data))
      .catch((err) => {
        console.log('Erro ao buscar bolos:', err);
        setBolosData([]);
      });
    fetch(`${API_URL}/doces`)
      .then((res) => res.json())
      .then((data) => setDocesData(data))
      .catch((err) => {
        console.log('Erro ao buscar doces:', err);
        setDocesData([]);
      });
    fetch(`${API_URL}/salgados`)
      .then((res) => res.json())
      .then((data) => setSalgadosData(data))
      .catch((err) => {
        console.log('Erro ao buscar salgados:', err);
        setSalgadosData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Busca de estoque com tratamento de erro e log
  useEffect(() => {
    fetch(`${API_URL}/estoque`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar estoque');
        return res.json();
      })
      .then((data) => {
        console.log('Estoque recebido:', data);
      })
      .catch((err) => {
        console.log('Erro ao buscar estoque:', err);
      });
  }, []);

  // Mapeamento estático de imagens
const imageMap = {
  'bolo.png': require('../assets/images/bolo.png'),
  'trufas.png': require('../assets/images/trufas.png'),
  'brigadeiro.png': require('../assets/images/brigadeiro.png'),
  'beijinhos.png': require('../assets/images/beijinhos.png'),
  'casadinho.png': require('../assets/images/casadinho.png'),
  'cajuzinho.png': require('../assets/images/cajuzinho.png'),
  'moranguinho.png': require('../assets/images/moranguinho.png'),
  'uva-encapada.png': require('../assets/images/uva-encapada.png'),
  'cerejinnha.png': require('../assets/images/cerejinnha.png'),
  'coxinha.png': require('../assets/images/coxinha.png'),
  'pastel.png': require('../assets/images/pastel.png'),
  'bolinha-queijo.png': require('../assets/images/bolinha-queijo.png'),
  'kibe.png': require('../assets/images/kibe.png'),
  'enroladinho.png': require('../assets/images/enroladinho.png'),
  'camarao-empanado.png': require('../assets/images/camarao-empanado.png'),
  // Adicione outros nomes de imagem conforme necessário
};

  // Função utilitária para mapear imagens vindas do backend
  function mapImage(product) {
    if (typeof product.image === 'string' && imageMap[product.image]) {
      return {
        ...product,
        image: imageMap[product.image]
      };
    }
    // Se não encontrar, retorna imagem padrão
    if (typeof product.image === 'string') {
      return {
        ...product,
        image: imageMap['bolo.png']
      };
    }
    return product;
  }

  let productsToShow = [];
  if (selectedMenu === "Bolos") productsToShow = bolosData.length ? bolosData.map(mapImage) : bolos;
  else if (selectedMenu === "Doces") productsToShow = docesData.length ? docesData.map(mapImage) : doces;
  else if (selectedMenu === "Salgados") productsToShow = salgadosData.length ? salgadosData.map(mapImage) : salgados;

  return (
    <Layout onCartPress={() => navigation.navigate('Carrinho')}>
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
