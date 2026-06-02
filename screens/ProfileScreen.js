import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [isModified, setIsModified] = useState(false);
  const [notifications, setNotifications] = useState({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const parsed = JSON.parse(data);
        setUserData(parsed);
        setFirstName(parsed.firstName);
        setLastName(parsed.lastName);
        setEmail(parsed.email);
        setAvatar(parsed.avatar);
        setPhoneNumber(parsed.phoneNumber || '');
      }

      const notificationSettings = await AsyncStorage.getItem('notifications');
      if (notificationSettings) {
        setNotifications(JSON.parse(notificationSettings));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleInputChange = () => {
    setIsModified(true);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatar(result.assets[0].uri);
      setIsModified(true);
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    setIsModified(true);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        avatar: avatar,
      };

      await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
      await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
      setIsModified(false);
      Alert.alert('Success', 'Changes saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save changes');
      console.error('Error saving data:', error);
    }
  };

  const handleDiscardChanges = () => {
    Alert.alert('Discard Changes', 'Are you sure you want to discard all changes?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Discard',
        style: 'destructive',
        onPress: () => {
          loadUserData();
          setIsModified(false);
        },
      },
    ]);
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('isOnboarded');
            navigation.replace('Onboarding');
          } catch (error) {
            Alert.alert('Error', 'Failed to log out');
            console.error('Error logging out:', error);
          }
        },
      },
    ]);
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setIsModified(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🍋 LITTLE LEMON</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Personal Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal information</Text>

          <View style={styles.avatarSection}>
            <Text style={styles.avatarLabel}>Avatar</Text>
            <View style={styles.avatarContainer}>
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarPlaceholderText}>📷</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.changeButton}
                onPress={pickImage}
              >
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
              {avatar && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={removeAvatar}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={styles.label}>First name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              handleInputChange();
            }}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Last name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              handleInputChange();
            }}
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              handleInputChange();
            }}
            keyboardType="email-address"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text);
              handleInputChange();
            }}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </View>

        {/* Email Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email notifications</Text>

          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationLabel}>Order statuses</Text>
            </View>
            <Switch
              value={notifications.orderStatuses}
              onValueChange={() => {
                toggleNotification('orderStatuses');
              }}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={notifications.orderStatuses ? '#495E57' : '#f4f3f4'}
            />
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationLabel}>Password changes</Text>
            </View>
            <Switch
              value={notifications.passwordChanges}
              onValueChange={() => {
                toggleNotification('passwordChanges');
              }}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={notifications.passwordChanges ? '#495E57' : '#f4f3f4'}
            />
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationLabel}>Special offers</Text>
            </View>
            <Switch
              value={notifications.specialOffers}
              onValueChange={() => {
                toggleNotification('specialOffers');
              }}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={notifications.specialOffers ? '#495E57' : '#f4f3f4'}
            />
          </View>

          <View style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationLabel}>Newsletter</Text>
            </View>
            <Switch
              value={notifications.newsletter}
              onValueChange={() => {
                toggleNotification('newsletter');
              }}
              trackColor={{ false: '#767577', true: '#81C784' }}
              thumbColor={notifications.newsletter ? '#495E57' : '#f4f3f4'}
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.discardButton}
            onPress={handleDiscardChanges}
            disabled={!isModified}
          >
            <Text style={styles.discardButtonText}>Discard changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveButton, !isModified && styles.saveButtonDisabled]}
            onPress={handleSaveChanges}
            disabled={!isModified}
          >
            <Text style={styles.saveButtonText}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#495E57',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: 'Karla Bold',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
  spacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Markazi Text',
    color: '#000',
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Karla Bold',
    color: '#495E57',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontFamily: 'Karla',
    fontSize: 14,
    backgroundColor: '#fff',
  },
  avatarSection: {
    marginBottom: 20,
  },
  avatarLabel: {
    fontSize: 12,
    fontFamily: 'Karla Bold',
    color: '#999',
    marginBottom: 12,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    fontSize: 32,
  },
  changeButton: {
    backgroundColor: '#495E57',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12,
  },
  changeButtonText: {
    color: '#fff',
    fontFamily: 'Karla Bold',
    fontSize: 12,
  },
  removeButton: {
    borderWidth: 1,
    borderColor: '#495E57',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  removeButtonText: {
    color: '#495E57',
    fontFamily: 'Karla Bold',
    fontSize: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationContent: {
    flex: 1,
  },
  notificationLabel: {
    fontSize: 14,
    fontFamily: 'Karla',
    color: '#000',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  logoutButton: {
    backgroundColor: '#F4CE14',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutButtonText: {
    fontFamily: 'Karla Bold',
    fontSize: 16,
    color: '#000',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  discardButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#495E57',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  discardButtonText: {
    fontFamily: 'Karla Bold',
    fontSize: 14,
    color: '#495E57',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#495E57',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#ccc',
  },
  saveButtonText: {
    fontFamily: 'Karla Bold',
    fontSize: 14,
    color: '#fff',
  },
});

export default ProfileScreen;
