import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NewMeetup } from '../types/Meetup';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,  Platform } from 'react-native';

interface AddMeetupProps {
    onSubmit: (values: NewMeetup) => void;
}

export const AddMeetup = ({ onSubmit }: AddMeetupProps) => {
    const initialValues: NewMeetup = {
      address: '',
      description: '',
      favorite: false,
      title: '',
    };

const validationSchema = Yup.object().shape({
     title: Yup.string().min(4, 'Title must be at least 4 characters').required('Title is required'),
     address: Yup.string().min(4, 'Address must be at least 4 characters').required('Address is required'),
     description: Yup.string().min(8, 'Description must be at least 8 characters').required('Description is required'),
    });



return (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
          }) => (
          <View>
            <View>
              <TextInput
                style={[styles.input, errors.title && styles.inputError]}
                placeholder="Meetup titel"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
              <Text style={styles.errorText}>{errors.title || ' '}</Text>
            </View>

            <View >
              <TextInput
                style={[styles.input, errors.address && styles.inputError]}
                placeholder="Adres"
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              <Text style={styles.errorText}>{errors.address || ' '}</Text>
            </View>

            <View >
              <TextInput
                style={[styles.input, errors.description && styles.inputError]}
                placeholder="Beschrijving"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
              <Text style={styles.errorText}>{errors.description || ' '}</Text>
            </View>

            <TouchableOpacity onPress={handleSubmit as any} style={styles.buttonToevoegen}>
              <Text style={styles.buttonText}>Meetup toevoegen</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
)
}

const styles = StyleSheet.create({
    input: { padding: 10, borderWidth: 1, borderColor: '#ccc', marginHorizontal: 10, width: "100%" },
    inputError: { borderColor: 'red' },
    buttonToevoegen: { backgroundColor: '#007bff', padding: 5, alignItems: 'center', borderRadius: 5, margin: 10 , marginTop: 30 },
    buttonText: { color: 'white' },
    errorText: { color: 'red', marginLeft: 10 },
})