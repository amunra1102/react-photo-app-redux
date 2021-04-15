import PropTypes from 'prop-types';
import React from 'react';
import { Formik, Form, FastField } from 'formik';
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';

import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';

import InputField from 'custom-field/input-field';
import SelectField from 'custom-field/select-field';
import RandomPhotoField from 'custom-field/random-photo-field';

const PhotoForm = ({ onSubmit, initialValues, isAddMode }) => {
  const validationSchema = Yup.object().shape({
    title: Yup
      .string()
      .required('This field is required.'),

    categoryId: Yup
      .number()
      .required('This field is required.')
      .nullable(),

    photo: Yup.string().when('categoryId', {
      is: 1,
      then: Yup.string().required('This field is required'),
      otherwise: Yup.string().notRequired()
    })
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      { formikProps => {
        // const { values, errors, touched } = formikProps;
        console.log(999, formikProps.errors);
        return (
          <Form>
            <FastField
              name="title"
              component={InputField}

              label="Title"
              placeholder="Eg: Wow nature ..."
            />

            <FastField
              name="categoryId"
              component={SelectField}

              label="Category"
              placeholder="What's your photo category?"
              options={PHOTO_CATEGORY_OPTIONS}
            />

            <FastField
              name="photo"
              component={RandomPhotoField}

              label="Photo"
            />

            <FormGroup>
              {formikProps.isSubmitting && <Spinner size="sm" />}
              <Button type="submit" color={isAddMode ? 'primary' : 'success'}>
                {isAddMode ? 'Add to album' : 'Update to album'}
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

PhotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
  onSubmit: null,
}

export default PhotoForm;
