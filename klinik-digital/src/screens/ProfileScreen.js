import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { storage } from '../services/storage';

export default function ProfileScreen({ navigation }) {
  const [ktpUri, setKtpUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setKtpUri(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    await storage.clearSession();
    navigation.replace('Login');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Profil Pasien & Klinik</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>R</Text>
        </View>
        <Text style={styles.name}>rina</Text>
        <Text style={styles.email}>Email: 12345678</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}><Ionicons name="business"/> Informasi Kontak Klinik</Text>
          <Text style={styles.infoText}>Nama: Klinik Sehat Utama</Text>
          <Text style={styles.infoText}>📞 No. Telepon: (021) 555-8899</Text>
          <Text style={styles.infoText}>💬 WhatsApp Darurat: 0812-3456-7890</Text>
          <Text style={styles.infoText}>📍 Alamat: Jl. Kesehatan Raya No. 45, Jakarta</Text>
        </View>

        <Text style={styles.ktpLabel}>Foto KTP Pasien (Verifikasi):</Text>
        <View style={styles.ktpBox}>
          {ktpUri ? (
            <Image source={{ uri: ktpUri }} style={{ width: '100%', height: 150, borderRadius: 8 }} />
          ) : (
            <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
              <Text style={styles.pickButtonText}>[ + Ambil Foto KTP via Kamera ]</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Keluar (Logout)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: colors.white, textAlign: 'center', marginBottom: 14 },
  profileCard: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 16, marginBottom: 30 },
  avatar: { alignSelf: 'center', backgroundColor: colors.primary, width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  avatarText: { color: colors.white, fontSize: 24, fontWeight: 'bold' },
  name: { textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: colors.textPrimary },
  email: { textAlign: 'center', color: colors.textSecondary, fontSize: 12, marginBottom: 16 },
  infoBox: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 16, backgroundColor: '#fcfcfc' },
  infoTitle: { fontWeight: 'bold', color: colors.primary, marginBottom: 6, fontSize: 13 },
  infoText: { color: colors.textSecondary, fontSize: 12, marginBottom: 3 },
  ktpLabel: { fontWeight: '600', fontSize: 13, color: colors.textPrimary, marginBottom: 6 },
  ktpBox: { borderWidth: 1, borderStyle: 'dashed', borderColor: colors.border, borderRadius: 10, padding: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  pickButton: { padding: 10 },
  pickButtonText: { color: colors.primary, fontWeight: 'bold', fontSize: 13 },
  logoutButton: { backgroundColor: colors.danger, borderRadius: 8, padding: 14, alignItems: 'center' },
  logoutText: { color: colors.white, fontWeight: 'bold', fontSize: 15 }
});