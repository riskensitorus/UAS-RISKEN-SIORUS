import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ItemCard({ item, onPress, onFavoritePress, isFavorite }) {
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.8} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.name || item.doctor}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>{item.specialist || item.category}</Text>
        
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{item.price || 'Tersedia'}</Text>
          
          {onFavoritePress && (
            <TouchableOpacity onPress={onFavoritePress} style={styles.favButton}>
              <Ionicons 
                name={isFavorite ? "heart" : "heart-outline"} 
                size={20} 
                color={isFavorite ? "#e74c3c" : "#95a5a6"} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  cardImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#7f8c8d',
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#27ae60',
  },
  favButton: {
    padding: 4,
  },
});