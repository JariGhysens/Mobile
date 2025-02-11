import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

type HeaderProps = {
  title: string;
  favoritesCount?: number;
  ShowReturnButton?: boolean;
  heart?: boolean;
};


const image = require('../assets/header.jpg');
const icon = require('../assets/icon.jpg');

export const Header : React.FC<HeaderProps> = ({
  title,
  favoritesCount,
  ShowReturnButton,
  heart,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <ImageBackground source={image} style={styles.background}>
        <View style={styles.content}>
          {ShowReturnButton && navigation.canGoBack() ? (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backText}>⬅️</Text>
            </TouchableOpacity>
            ) : ( <Image source={icon} style={styles.icon} />) 
          }       
          <Text style={globalStyles.title}>{title}</Text>
          <View style={styles.favoriteContainer}>
          {heart? (
  <Text style={styles.favoriteText}>
    {favoritesCount}
    <Text style={styles.heart}>❤️</Text>
  </Text>
) : ( <Text>           </Text>)}
            </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 10,
  },
  backText: {
    color: 'white',
    fontSize: 18,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins_300Light',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteText: {
    color: 'white',
    fontSize: 18,
    marginRight: 5,
  },
  heart: {
    fontSize: 20,
  },
});

