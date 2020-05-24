import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { AntDesign } from '@expo/vector-icons';

import Header from '../components/Header';
import Button from '../components/Button';

const CreateScreen = ({ navigation }) => {
  const [formState, setFormState] = useState({});
  return (
    <View style={[t.flex1]}>
      <Header back navigation={navigation} title="Create Post" />
      <ScrollView keyboardShouldPersistTaps="never" style={[t.flex1, t.p6]}>
        <Text style={[t.fontBold, t.text2xl]}>Title</Text>
        <TextInput
          value={formState.title}
          onChangeText={(text) => setFormState({ ...formState, title: text })}
          placeholder="Title here..."
          style={[t.border, t.p4, t.mT3, t.rounded, t.borderGray500, t.textLg]}
        />
        <Text style={[t.fontBold, t.text2xl, t.mT6]}>Description</Text>
        <TextInput
          value={formState.description}
          onChangeText={(text) =>
            setFormState({ ...formState, description: text })
          }
          placeholder="Description here..."
          multiline
          style={[
            t.border,
            t.pT4,
            t.p4,
            t.mT3,
            t.rounded,
            t.borderGray500,
            t.textLg,
            t.mB6,
            { minHeight: 200 }
          ]}
        />
        <Button>
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
            Submit
          </Text>
          <AntDesign name="arrowright" size={24} color="white" />
        </Button>
      </ScrollView>
    </View>
  );
};

export default CreateScreen;
