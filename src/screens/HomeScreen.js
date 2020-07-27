import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  UIManager
} from 'react-native';
import { t, color } from 'react-native-tailwindcss';
import Ripple from 'react-native-material-ripple';
import { API, graphqlOperation } from 'aws-amplify';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import * as queries from './../graphql/queries';

import { AuthContext } from '../AuthContext';

import routes from '../constants/routes';

import { GRADIENT_COLORS } from '../constants/colors';
import Header from '../components/Header';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Item = ({ id, title, description, editable, navigation }) => {
  const [fullView, setFullView] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setFullView((prev) => !prev);
      }}
      activeOpacity={0.8}
      style={[t.p4, t.mB3, t.roundedLg, t.shadowMd, t.bgGray100]}
    >
      <View style={[t.flexRow, t.justifyBetween]}>
        <Text style={[t.textXl, t.mB3, t.fontBold, t.textBlue900]}>
          {title}
        </Text>
        {editable && (
          <TouchableOpacity
            onPress={() => navigation.navigate(routes.Create, { id })}
            style={[t.pX2]}
          >
            <AntDesign name="edit" size={20} color={color.gray900} />
          </TouchableOpacity>
        )}
      </View>
      <Text
        style={[t.textBase, t.mB3, t.textGray800]}
        numberOfLines={fullView ? 0 : 2}
      >
        {description}
      </Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);

  async function fetchPosts() {
    try {
      const { data } = await API.graphql(graphqlOperation(queries.listPosts));
      setData(data.listPosts.items);
      console.log(data, 'data');
    } catch (err) {
      console.log(err, 'error fetching todos');
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [])
  );

  return (
    <View style={[t.flex1]}>
      <Header navigation={navigation} title="Blog Posts" />
      <View style={t.flex1}>
        <Text
          style={[t.mL5, t.mT5, t.mB3, t.textBlue900, t.fontBold, t.textXl]}
        >
          Hello {user.username}!
        </Text>
        <FlatList
          contentContainerStyle={[t.p5]}
          data={data}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              navigation={navigation}
              editable={user.email === item.createdBy}
              description={item.description}
              title={item.title}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
