import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@klinik_users';
const SESSION_KEY = '@klinik_session';
const BOOKINGS_KEY = '@klinik_bookings';

export const storage = {
  async saveUser(userData) {
    try {
      const existing = await this.getUsers();
      const updated = [...existing, userData];
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updated));
      return true;
    } catch (e) {
      return false;
    }
  },

  async getUsers() {
    try {
      const data = await AsyncStorage.getItem(USERS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async saveSession(user) {
    try {
      await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } catch (e) {}
  },

  async getSession() {
    try {
      const data = await AsyncStorage.getItem(SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  async clearSession() {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  },

  async getBookings() {
    try {
      const data = await AsyncStorage.getItem(BOOKINGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async saveBooking(booking) {
    try {
      const existing = await this.getBookings();
      const updated = [booking, ...existing];
      await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      return [];
    }
  }
};