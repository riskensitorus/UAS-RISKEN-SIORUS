import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

export default function HomeScreen({ navigation }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [complaint, setComplaint] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const doctors = [
    { id: '1', name: 'Dr. Andi Pratama, Sp.A', specialist: 'Dokter Spesialis Anak', schedule: 'Senin - Rabu (09:00 - 13:00)', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300' },
    { id: '2', name: 'Dr. Budi Santoso, M.Ked', specialist: 'Dokter Umum', schedule: 'Senin - Jumat (08:00 - 15:00)', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300' },
    { id: '3', name: 'Dr. Maya Lestari, Sp.KK', specialist: 'Dokter Spesialis Kulit & Kelamin', schedule: 'Rabu - Jumat (10:00 - 14:00)', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300' },
    { id: '4', name: 'Dr. Rian Hidayat, Sp.THT', specialist: 'Dokter Spesialis THT', schedule: 'Senin, Kamis (14:00 - 18:00)', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300' },
  ];

  const handleSelectDoctor = (doc) => {
    setSelectedDoctor(doc);
    setSelectedDate(''); // Reset tanggal saat ganti dokter
  };

  const handleBooking = async () => {
    if (!selectedDoctor) {
      Alert.alert('Perhatian', 'Silakan pilih dokter terlebih dahulu!');
      return;
    }
    if (!selectedDate) {
      Alert.alert('Perhatian', 'Silakan pilih tanggal konsultasi pada kalender!');
      return;
    }
    if (!complaint.trim()) {
      Alert.alert('Perhatian', 'Silakan tuliskan keluhan medis Anda!');
      return;
    }

    try {
      const newBooking = {
        id: Date.now().toString(),
        doctor: selectedDoctor.name,
        specialist: selectedDoctor.specialist,
        image: selectedDoctor.image,
        consultDate: selectedDate,
        complaint: complaint,
        createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      };

      const existingData = await AsyncStorage.getItem('booking_history');
      const historyList = existingData ? JSON.parse(existingData) : [];

      historyList.unshift(newBooking);
      await AsyncStorage.setItem('booking_history', JSON.stringify(historyList));

      Alert.alert(
        'Berhasil', 
        `Booking ke ${selectedDoctor.name} pada tanggal ${selectedDate} berhasil disimpan!`,
        [
          { 
            text: 'OK', 
            onPress: () => {
              setSelectedDoctor(null);
              setSelectedDate('');
              setComplaint('');
              navigation.navigate('Riwayat');
            } 
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data booking.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Ionicons name="medical" size={28} color="#fff" />
          <Text style={styles.clinicTitle}>Klinik Sehat Utama</Text>
        </View>

        <Text style={styles.headerSubtitle}>Pilih dokter spesialis dan tentukan jadwal konsultasi pada kalender.</Text>
        
        <Text style={styles.sectionLabel}>Pilih Dokter (Klik untuk memilih):</Text>
        
        {doctors.map((doc) => {
          const isSelected = selectedDoctor?.id === doc.id;
          return (
            <TouchableOpacity 
              key={doc.id} 
              style={[styles.doctorCard, isSelected && styles.selectedCard]}
              onPress={() => handleSelectDoctor(doc)}
            >
              <Image source={{ uri: doc.image }} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doc.name}</Text>
                <Text style={styles.doctorSpecialist}>{doc.specialist}</Text>
                <Text style={styles.doctorSchedule}><Ionicons name="time-outline" size={12} /> {doc.schedule}</Text>
              </View>
              {isSelected && <Ionicons name="checkmark-circle" size={24} color="#27ae60" style={styles.checkIcon} />}
            </TouchableOpacity>
          );
        })}

        {/* Bagian Kalender Interaktif Muncul Ketika Dokter Dipilih */}
        {selectedDoctor && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>Pilih Tanggal Konsultasi</Text>
            <Text style={styles.inputLabel}>Dokter: {selectedDoctor.name}</Text>

            <Calendar
              style={styles.calendarStyle}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#0088cc',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#0088cc',
                dayTextColor: '#2d4150',
                arrowColor: '#0088cc',
                monthTextColor: '#0088cc',
                textMonthFontWeight: 'bold',
                textDayFontSize: 14,
                textMonthFontSize: 16,
              }}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={
                selectedDate ? {
                  [selectedDate]: { selected: true, selectedColor: '#0088cc', selectedTextColor: '#ffffff' }
                } : {}
              }
            />

            {selectedDate ? (
              <Text style={styles.selectedDateText}>Tanggal Dipilih: {selectedDate}</Text>
            ) : null}

            <Text style={[styles.inputLabel, { marginTop: 14 }]}>Keluhan Medis:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Contoh: Sakit kepala, badan terasa pegal..."
              placeholderTextColor="#95a5a6"
              multiline
              numberOfLines={4}
              value={complaint}
              onChangeText={setComplaint}
            />

            <TouchableOpacity style={styles.bookingButton} onPress={handleBooking}>
              <Text style={styles.bookingButtonText}>Konfirmasi Booking</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0088cc' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  clinicTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginLeft: 8 },
  headerSubtitle: { color: '#ecf0f1', fontSize: 14, marginBottom: 16 },
  sectionLabel: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  doctorCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, alignItems: 'center', elevation: 3 },
  selectedCard: { borderWidth: 2, borderColor: '#27ae60' },
  doctorImage: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#ddd' },
  doctorInfo: { flex: 1, marginLeft: 12 },
  doctorName: { fontSize: 15, fontWeight: 'bold', color: '#2c3e50' },
  doctorSpecialist: { fontSize: 13, color: '#2980b9', marginTop: 2 },
  doctorSchedule: { fontSize: 11, color: '#7f8c8d', marginTop: 4 },
  checkIcon: { marginLeft: 8 },
  formContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginTop: 10, elevation: 3 },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', marginBottom: 8 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#34495e', marginBottom: 6 },
  calendarStyle: { borderRadius: 8, borderWidth: 1, borderColor: '#ecf0f1', marginBottom: 10 },
  selectedDateText: { fontSize: 13, fontWeight: 'bold', color: '#27ae60', marginBottom: 8, textAlign: 'center' },
  textInput: { borderWidth: 1, borderColor: '#dcdde1', borderRadius: 8, padding: 10, height: 90, textAlignVertical: 'top', fontSize: 14, color: '#2c3e50', marginBottom: 16 },
  bookingButton: { backgroundColor: '#1abc9c', borderRadius: 8, padding: 14, alignItems: 'center' },
  bookingButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});