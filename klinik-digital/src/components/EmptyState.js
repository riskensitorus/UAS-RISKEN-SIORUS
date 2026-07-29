import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function EmptyState({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, alignItems: 'center', justifyContent: 'center' },
  text: { color: colors.textSecondary, fontSize: 14, textAlign: 'center' }
});