import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const OnboardingScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  React.useEffect(() => {
    setIsButtonEnabled(firstName.trim() !== '' && email.trim() !== '');
  }, [firstName, email]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleNext = async () => {
    if (!isButtonEnabled) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        avatar: avatar,
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('isOnboarded', 'true');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data');
      console.error('Error saving data:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍋 LITTLE LEMON</Text>
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Chicago</Text>
        <Text style={styles.heroDescription}>
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
        </Text>
        {avatar && (
          <Image source={{ uri: avatar }} style={styles.heroImage} />
        )}
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Get Started</Text>

        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarButton} onPress={pickImage}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarPlaceholder}>📷</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.avatarLabel}>Select Avatar</Text>
        </View>

        <Text style={styles.label}>First Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter first name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter last name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity
        style={[
          styles.nextButton,
          !isButtonEnabled && styles.nextButtonDisabled,
        ]}
        onPress={handleNext}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
    fontFamily: 'Karla Bold',
  },
  heroSection: {
    backgroundColor: '#495E57',
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 10,
  },
  heroTitle: {
    fontSize: 48,
    fontFamily: 'Markazi Text',
    color: '#F4CE14',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 16,
    fontFamily: 'Karla Bold',
  },
  heroDescription: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: 'Karla',
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 16,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: 'Markazi Text',
    marginBottom: 20,
    color: '#000',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    fontSize: 40,
  },
  avatarLabel: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Karla',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Karla Bold',
    color: '#495E57',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 20,
    fontFamily: 'Karla',
    fontSize: 14,
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#495E57',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Karla Bold',
  },
});

export default OnboardingScreen;
