import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { LinearGradient } from 'expo-linear-gradient';
import { t } from 'react-native-tailwindcss';

import { GRADIENT_COLORS } from '../constants/colors';

const Button = ({ loading, children, ...props }) => (
  <Ripple disabled={loading} rippleColor="white" style={t.shadowXl} {...props}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={GRADIENT_COLORS}
      style={[t.justifyCenter, t.p3, t.roundedLg, t.flexRow]}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </LinearGradient>
  </Ripple>
);
export default Button;
