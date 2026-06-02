import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MENU_ITEMS = [
  {
    id: '1',
    name: 'Greek Salad',
    description: 'The famous greek salad of crispy lettuce, peppers, olives and our Chicago...',
    price: '$12.99',
    category: 'Starters',
  },
  {
    id: '2',
    name: 'Bruschetta',
    description: 'Our Bruschetta is made from grilled bread that has been smeared with garli...',
    price: '$7.99',
    category: 'Starters',
  },
  {
    id: '3',
    name: 'Grilled Fish',
    description: 'Barbeqed catch of the day, with red onion, crisp capers, chive creme fraiche...',
    price: '$20.00',
    category: 'Mains',
  },
  {
    id: '4',
    name: 'Pasta',
    description: 'Penne with fried aubergines, tomato sauce, fresh chilli, garlic, basil & salted...',
    price: '$18.99',
    category: 'Mains',
  },
  {
    id: '5',
    name: 'Lemon Dessert',
    description: 'Light and fluffy traditional homemade Italian lemon and ricotta cake',
    price: '$6.99',
    category: 'Desserts',
  },
];

const CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks'];

const HomeScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const categoryMatch =
        selectedCategory === 'All' || item.category === selectedCategory;
      const searchMatch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItemContainer}>
      <View style={styles.menuItemContent}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.menuItemPrice}>{item.price}</Text>
      </View>
      <View style={styles.menuItemImagePlaceholder}>
        <Text style={styles.imagePlaceholder}>🍽️</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🍋 LITTLE LEMON</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileButton}
        >
          <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Little Lemon</Text>
            <Text style={styles.heroSubtitle}>Chicago</Text>
            <Text style={styles.heroDescription}>
              We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
            </Text>
          </View>
          <View style={styles.heroImagePlaceholder}>
            <Text style={styles.heroImageText}>🍖</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>

        {/* Menu Breakdown */}
        <View style={styles.menuBreakdownSection}>
          <Text style={styles.menuBreakdownTitle}>ORDER FOR DELIVERY!</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category &&
                    styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category &&
                      styles.categoryButtonTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Food Menu List */}
        <View style={styles.menuListSection}>
          <FlatList
            data={filteredItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginTop: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Karla Bold',
    letterSpacing: 1.5,
    flex: 1,
    textAlign: 'center',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#495E57',
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroContent: {
    flex: 1,
    paddingRight: 12,
  },
  heroTitle: {
    fontSize: 48,
    fontFamily: 'Markazi Text',
    color: '#F4CE14',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
    fontFamily: 'Karla Bold',
  },
  heroDescription: {
    fontSize: 13,
    color: '#fff',
    lineHeight: 18,
    fontFamily: 'Karla',
  },
  heroImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImageText: {
    fontSize: 60,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Karla',
    fontSize: 14,
    color: '#000',
  },
  menuBreakdownSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  menuBreakdownTitle: {
    fontSize: 18,
    fontFamily: 'Karla Bold',
    color: '#000',
    marginBottom: 16,
  },
  categoriesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#495E57',
    borderColor: '#495E57',
  },
  categoryButtonText: {
    fontFamily: 'Karla Bold',
    fontSize: 13,
    color: '#495E57',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  menuListSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flex: 1,
    marginRight: 12,
  },
  menuItemName: {
    fontSize: 16,
    fontFamily: 'Karla Bold',
    color: '#000',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 12,
    fontFamily: 'Karla',
    color: '#666',
    lineHeight: 16,
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 14,
    fontFamily: 'Karla Bold',
    color: '#495E57',
  },
  menuItemImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    fontSize: 40,
  },
});

export default HomeScreen;
