import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export default function ProductPage({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your API if different
  const API_URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.rating}>⭐{item.rating.rate}</Text>
      <Text onPress={() => navigation.navigate('Cart')} style={styles.edit}>View Cart</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.list}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  edit:{
    height: 25,
    width:60,
    marginTop:10,
    padding:5,
    backgroundColor:'black',
    color:'white',
    fontSize:10,
    borderRadius:10,
    display:"flex",
    alignItems:'cneter',
    
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  image: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
  },
  price: {
    marginTop: 5,
    color: 'green',
  },
  rating: {
    marginTop: 5,
    color: 'orange',
  },
});
