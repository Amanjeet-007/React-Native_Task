import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { CartContext } from '../Context/CardContext.js';

export default function ProductDetails({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>

      <Text style={styles.rating}>⭐ {product.rating.rate} ({product.rating.count} ratings)</Text>

      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.button}>
        <Button title="Add to Cart" onPress={() => addToCart(product)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: 'orange',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
});
