import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RiwayatScreen() {
  const [historyList, setHistoryList] = useState([]);

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem('booking_history');
      if (data) {
        setHistoryList(JSON.parse(data));
      } else {
        setHistoryList([]);
      }
    } catch (error) {
      console.log('Gagal memuat riwayat', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const clearHistory = async () => {
    Alert.alert(
      'Hapus Riwayat',
      'Apakah Anda yakin ingin menghapus semua riwayat konsultasi?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          onPress: async () => {
            await AsyncStorage.removeItem('booking_history');
            setHistoryList([]);
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Konsultasi</Text>
        {historyList.length > 0 && (
          <TouchableOpacity onPress={clearHistory}>
            <Ionicons name="trash-outline" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {historyList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color="#bdc3c7" />
          <Text style={styles.emptyText}>Belum ada riwayat booking.</Text>
          <Text style={styles.emptySubText}>Silakan lakukan booking dokter dari halaman Beranda.</Text>
        </View>
      ) : (
        <FlatList
          data={historyList}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Image source={{ uri: item.image }} style={styles.doctorImage} />
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{item.doctor}</Text>
                  <Text style={styles.specialist}>{item.specialist}</Text>
                </View>
              </View>

              {/* Tanggal Konsultasi dari Kalender */}
              <View style={styles.scheduleBadge}>
                <Ionicons name="calendar-outline" size={15} color="#0088cc" />
                <Text style={styles.scheduleText}>Tanggal Konsultasi: {item.consultDate}</Text>
              </View>

              <Text style={styles.complaintLabel}>Keluhan Medis:</Text>
              <Text style={styles.complaintText}>{item.complaint}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0088cc', padding: 16 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  listContainer: { padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 12, elevation: 2 },
  cardTop: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ecf0f1', paddingBottom: 10 },
  doctorImage: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ddd' },
  doctorInfo: { flex: 1, marginLeft: 12 },
  doctorName: { fontSize: 15, fontWeight: 'bold', color: '#2c3e50' },
  specialist: { fontSize: 12, color: '#2980b9', marginTop: 2 },
  scheduleBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ebf5fb', padding: 10, borderRadius: 8, marginTop: 10 },
  scheduleText: { fontSize: 13, fontWeight: 'bold', color: '#0088cc', marginLeft: 6 },
  complaintLabel: { fontSize: 11, fontWeight: '600', color: '#7f8c8d', marginTop: 10 },
  complaintText: { fontSize: 13, color: '#34495e', backgroundColor: '#f8f9fa', padding: 8, borderRadius: 6, marginTop: 2 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { fontSize: 16, fontWeight: 'bold', color: '#7f8c8d', marginTop: 12 },
  emptySubText: { fontSize: 13, color: '#95a5a6', textAlign: 'center', marginTop: 4 },
});