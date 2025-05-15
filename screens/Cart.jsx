import React, { useContext } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, TextInput } from 'react-native';
import { CartContext } from '../Context/CardContext.js';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.quantityContainer}>
          <Text>Qty:</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={item.quantity.toString()}
            onChangeText={(text) => {
              const qty = parseInt(text) || 1;
              updateQuantity(item.id, qty);
            }}
          />
          <Button title="Remove" onPress={() => removeFromCart(item.id)} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <Text style={styles.total}>Total: ${getTotalPrice()}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
  },
  price: {
    color: 'green',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 50,
    padding: 5,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
});
