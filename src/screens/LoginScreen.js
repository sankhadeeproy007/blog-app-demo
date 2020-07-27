import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { Auth } from 'aws-amplify';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

import { AuthContext } from '../AuthContext.js';

import Button from '../components/Button';

import routes from '../constants/routes';

import { GRADIENT_COLORS } from '../constants/colors';

const LoginScreen = ({ navigation }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [formState, setFormState] = useState({});

  const { setIsSignedIn, setUser } = useContext(AuthContext);
  async function SignUp() {
    const { username, password, email } = formState;
    try {
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      });
      console.log({ user });
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async function SignIn() {
    const { username, password } = formState;
    try {
      const user = await Auth.signIn(username, password);
      setUser({ username: user.username, email: user.attributes.email });
      console.log(user, 'user');
      setIsSignedIn(true);
    } catch (error) {
      console.log('error signing in', error);
    }
  }

  useEffect(() => {
    // clear formState when switching between login an d signup
    setFormState({});
  }, [showLogin]);

  const handleSubmit = () => {
    if (showLogin) {
      SignIn();
    } else {
      SignUp();
    }
  };

  const textInputStyle = [
    t.border,
    t.rounded,
    t.borderIndigo800,
    t.p3,
    t.textLg,
    t.textBlue900,
    t.mB4
  ];

  return (
    <View style={[t.flex1]}>
      <LinearGradient colors={GRADIENT_COLORS} style={[t.flex1, t.p8]}>
        <AntDesign
          name="filetext1"
          style={[t.mB16, t.mT20, t.textCenter]}
          size={124}
          color="rgba(255,255,255, 0.3)"
        />
        <View style={[t.flexRow, t.mB4]}>
          <Text
            style={[
              t.textWhite,
              t.text2xl,
              t.fontBold,
              t.mR3,
              { lineHeight: 26 }
            ]}
          >
            {showLogin ? 'LOGIN' : 'SIGNUP'}
          </Text>
          <AntDesign name="addusergroup" size={24} color="white" />
        </View>

        <View style={[t.bgGray100, t.roundedLg, t.p8, t.shadow2xl]}>
          {!showLogin && (
            <TextInput
              value={formState.email}
              onChangeText={(text) =>
                setFormState({ ...formState, email: text })
              }
              placeholder="Email"
              textContentType="emailAddress"
              keyboardType="email-address"
              style={textInputStyle}
            />
          )}
          <TextInput
            value={formState.username}
            onChangeText={(text) =>
              setFormState({ ...formState, username: text })
            }
            placeholder="Username"
            style={textInputStyle}
          />
          <TextInput
            value={formState.password}
            onChangeText={(text) =>
              setFormState({ ...formState, password: text })
            }
            placeholder="Password"
            secureTextEntry
            style={textInputStyle}
          />

          <Button onPress={handleSubmit}>
            <Text
              style={[
                t.textWhite,
                t.textXl,
                t.fontBold,
                t.textCenter,
                t.mR3,
                { lineHeight: 23 }
              ]}
            >
              {showLogin ? 'Login' : 'Create'}
            </Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </Button>
          <View style={[t.flexRow, t.mT3, t.justifyCenter]}>
            <Text style={[t.textGray900, t.textBase, t.mR2]}>
              {showLogin
                ? 'Do not have an account?'
                : 'Already have an account?'}
            </Text>
            <Text
              onPress={() => setShowLogin((prev) => !prev)}
              style={[t.textBlue900, t.textBase]}
            >
              {showLogin ? 'Sign Up' : 'Login'}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default LoginScreen;
