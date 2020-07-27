import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { AntDesign } from '@expo/vector-icons';
import { API, graphqlOperation } from 'aws-amplify';

import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { AuthContext } from '../AuthContext';

import Header from '../components/Header';
import Button from '../components/Button';

const CreateScreen = ({ route, navigation }) => {
  const [formState, setFormState] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  console.log(route, 'user');
  const { id } = route?.params || {};

  const handleDelete = async () => {
    try {
      await API.graphql(
        graphqlOperation(mutations.deletePost, {
          input: { id }
        })
      );
      setFormState({});
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const headerProps = {
    navigation,
    title: id ? 'Edit Post' : 'Create Post',
    ...(id && { onDeletePost: handleDelete })
  };

  useEffect(() => {
    getPostById();
  }, []);

  const getPostById = async () => {
    try {
      const { data } = await API.graphql(
        graphqlOperation(queries.getPost, {
          id
        })
      );
      setFormState(data.getPost);
    } catch (err) {
      console.log('error creating post:', err);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (id) {
      try {
        const { title, description } = formState;
        await API.graphql(
          graphqlOperation(mutations.updatePost, {
            input: { id, title, description }
          })
        );
        setFormState({});
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('error creating post:', err);
      }
    } else {
      try {
        const { title, description } = formState;
        await API.graphql(
          graphqlOperation(mutations.createPost, {
            input: { title, description, createdBy: user.email }
          })
        );
        setFormState({});
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('error creating post:', err);
      }
    }
  };

  return (
    <View style={[t.flex1]}>
      <Header {...headerProps} />
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
        <Button loading={loading} onPress={handleSubmit}>
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
