import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { t } from 'react-native-tailwindcss';
import Ripple from 'react-native-material-ripple';

import { GRADIENT_COLORS } from '../constants/colors';
import Header from '../components/Header';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Post',
    description:
      'It has been widely reported that players and clubs in the WSL and Championship do not want to see out the remainder of the season, though it was only last Wednesday that clubs were finally asked to consider cancellation formally and the nuances of it.'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Post',
    description:
      'The DFB and DFL – the German FA and the league, respectively – have pulled together to provide support across the sport, including the elite women’s game.'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Post',
    description:
      'The idea that there could be ways to generate new income or push the biggest Premier League clubs into making the same financial sacrifices as those top Bundesliga clubs.'
  },
  {
    id: '58694a0f-3da1-429g-bd96-145590e29f72',
    title: 'Fourth Post',
    description:
      'Two of the questions put to clubs in the WSL and the Championship this past week were whether clubs could possibly meet the necessary safety requirements to finish the season and whether they have the financial resources to do so.'
  },
  {
    id: '58404a0f-7ho5-471f-bd96-142171e39d72',
    title: 'Fifth Post',
    description:
      'The lack of financial support, the lengthy period of uncertainty and an unwillingness to bring football’s resources together to navigate this crisis means the feedback to the FA’s questions will likely go only one way.'
  }
];

const Item = ({ title, description }) => {
  const [fullView, setFullView] = useState(false);
  return (
    <Ripple
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setFullView((prev) => !prev);
      }}
      rippleColor="transparent"
      style={[t.p4, t.mB3, t.roundedLg, t.shadowMd, t.bgGray100]}
    >
      <Text style={[t.textXl, t.mB3, t.fontBold, t.textBlue900]}>{title}</Text>
      <Text
        style={[t.textBase, t.mB3, t.textGray800]}
        numberOfLines={fullView ? 0 : 2}
      >
        {description}
      </Text>
    </Ripple>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={[t.flex1]}>
      <Header navigation={navigation} title="Blog Posts" />
      <View style={t.flex1}>
        <Text
          style={[t.mL5, t.mT5, t.mB3, t.textBlue900, t.fontBold, t.textXl]}
        >
          Hello User!
        </Text>
        <FlatList
          contentContainerStyle={[t.p5]}
          data={DATA}
          renderItem={({ item }) => (
            <Item description={item.description} title={item.title} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
