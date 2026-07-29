import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import colors from '../constants/colors';
import { storage } from '../services/storage';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !phone || !password) {
      Alert.alert('Error', 'Semua field wajib diisi!');
      return;
    }
    const success = await storage.saveUser({ name, phone, password });
    if (success) {
      Alert.alert('Sukses', 'Registrasi berhasil, silakan masuk.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Daftar Akun Baru</Text>
        <Text style={styles.subtitle}>Lengkapi data diri untuk akses klinik.</Text>

        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput style={styles.input} placeholder="Nama Anda" value={name} onChangeText={setName} />

        <Text style={styles.label}>No. Telepon / Email</Text>
        <TextInput style={styles.input} placeholder="08123456789" value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>Kata Sandi</Text>
        <TextInput style={styles.input} placeholder="••••••••" secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Daftar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 15, alignItems: 'center' }}>
          <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Sudah punya akun? Masuk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, justifyContent: 'center', padding: 16 },
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 6 },
  subtitle: { fontSize: 13, color: colors.textSecondary, marginBottom: 20 },
  label: { fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, fontSize: 14, marginBottom: 16, backgroundColor: '#fafafa' },
  button: { backgroundColor: colors.success, borderRadius: 8, padding: 14, alignItems: 'center' },
  buttonText: { color: colors.white, fontWeight: 'bold', fontSize: 16 }
});