import React from 'react';
import { View, Text } from 'react-native';
import { t, color } from 'react-native-tailwindcss';
import { LinearGradient } from 'expo-linear-gradient';
import Ripple from 'react-native-material-ripple';
import { AntDesign } from '@expo/vector-icons';

import { GRADIENT_COLORS } from '../constants/colors';
import routes from '../constants/routes';

const Header = ({ navigation, title, back }) => {
  return (
    <View style={[t.shadowMd, { height: 100 }]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={GRADIENT_COLORS}
        style={[
          t.flex1,
          t.flexRow,
          t.justifyBetween,
          t.pT8,
          { alignItems: 'center' }
        ]}
      >
        <View style={[t.flexRow, { alignItems: 'center' }]}>
          <Ripple
            onPress={() => navigation.goBack()}
            rippleColor="white"
            style={[t.p4, { opacity: !back ? 0 : 1 }]}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </Ripple>
          <Text style={[t.textWhite, t.fontBold, t.textXl, t.mL3]}>
            {title}
          </Text>
        </View>
        <View style={[t.flexRow]}>
          <Ripple
            onPress={() => navigation.navigate(routes.Create)}
            rippleColor="white"
            style={[t.p4]}
          >
            <AntDesign name="pluscircle" size={24} color="white" />
          </Ripple>
          <Ripple rippleColor="white" style={[t.p4, t.mR2]}>
            <AntDesign name="deleteusergroup" size={24} color="white" />
          </Ripple>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Header;
