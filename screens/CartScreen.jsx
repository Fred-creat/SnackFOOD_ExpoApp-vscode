import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useCart } from "../components/CartContext";
import Layout from "../components/Layout";
import { API_URL } from "../api";

const paymentMethods = [
  "Dinheiro",
  "Cartão de Crédito",
  "Cartão de Débito",
  "Pix",
];

export default function CartScreen({ navigation }) {
  const { cart, removeFromCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showPix, setShowPix] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace(',', '.')) : item.price;
    return sum + (price * item.qty);
  }, 0);

  function handleFinishOrder() {
    if (!name || !address || !phone || !selectedPayment) {
      Alert.alert('Preencha todos os campos e escolha a forma de pagamento!');
      return;
    }
    if (selectedPayment === 'Pix') {
      setShowPix(true);
    }
    setLoading(true);
    fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: name,
        endereco: address,
        telefone: phone,
        pagamento: selectedPayment,
        itens: cart,
        total: totalPrice
      })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw err; });
        }
        return res.json();
      })
      .then(data => {
        Alert.alert('Pedido enviado!', 'Seu pedido foi recebido com sucesso.');
        // Aqui você pode limpar o carrinho ou navegar para outra tela
      })
      .catch((err) => {
        console.log('Erro ao enviar pedido:', err);
        Alert.alert('Erro', 'Não foi possível enviar o pedido. ' + (err?.mensagem || ''));
      })
      .finally(() => setLoading(false));
  }

  const renderFooter = () => (
    <View>
      <Text style={styles.total}>Total: R$ {totalPrice.toFixed(2)}</Text>
      <Text style={styles.paymentTitle}>Forma de Pagamento:</Text>
      <View style={styles.paymentContainer}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method}
            style={[
              styles.paymentButton,
              selectedPayment === method && styles.paymentButtonSelected,
            ]}
            onPress={() => {
              setSelectedPayment(method);
              if (method === 'Pix') setShowPix(true);
              else setShowPix(false);
            }}
          >
            <Text
              style={[
                styles.paymentButtonText,
                selectedPayment === method && styles.paymentButtonTextSelected,
              ]}
            >
              {method}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {showPix && (
        <View style={styles.pixBox}>
          <Text style={styles.pixTitle}>Chave Pix para pagamento:</Text>
          <Text selectable style={styles.pixKey}>7599974-1333</Text>
        </View>
      )}
      <Text style={styles.formTitle}>Dados para entrega:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço de entrega"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone para contato"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity style={styles.finishButton} onPress={handleFinishOrder} disabled={loading}>
        <Text style={styles.finishButtonText}>{loading ? 'Enviando...' : 'Finalizar Pedido'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Layout showCart={false}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.cardArea}>
          <TouchableOpacity style={styles.backTop} onPress={() => navigation.goBack()}>
            <Text style={styles.backTextTop}>Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Carrinho</Text>
          {cart.length === 0 ? (
            <Text style={styles.empty}>Seu carrinho está vazio.</Text>
          ) : (
            <ScrollView keyboardShouldPersistTaps="handled">
              {cart.map((item) => (
                <View style={styles.item} key={item.name}>
                  {item.image && <Image source={item.image} style={styles.image} />}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.recheio && <Text style={styles.recheio}>Recheio: {item.recheio}</Text>}
                    <Text style={styles.price}>R$ {item.price} x {item.qty}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeFromCart(item.name)}>
                    <Text style={styles.remove}>Remover</Text>
                  </TouchableOpacity>
                </View>
              ))}
              {renderFooter()}
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  empty: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recheio: {
    fontSize: 15,
    color: "#333",
  },
  price: {
    fontSize: 16,
    marginTop: 2,
  },
  remove: {
    color: "#c62828",
    fontWeight: "bold",
    marginLeft: 10,
  },
  backTop: {
    alignSelf: 'flex-start',
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom: 10,
  },
  backTextTop: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardArea: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginVertical: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  paymentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paymentButton: {
    backgroundColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    margin: 5,
  },
  paymentButtonSelected: {
    backgroundColor: '#2e7d32',
  },
  paymentButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  paymentButtonTextSelected: {
    color: '#fff',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  pixBox: {
    backgroundColor: '#e0ffe0',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  pixTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#2e7d32',
  },
  pixKey: {
    fontSize: 18,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
