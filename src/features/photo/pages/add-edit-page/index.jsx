import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Banner from '../../../../components/banner';
import PhotoForm from '../../components/photo-form';

import { addPhoto, updatePhoto } from 'features/photo/photo-slice';

import './styles.scss';
import { useHistory, useParams } from 'react-router';

const AddEditPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { photoId } = useParams();

  const editPhoto = useSelector(({ photos }) => photos.find(photo => photo.id === +photoId));

  const isAddMode = !photoId;

  const initialValues = isAddMode
    ? {
      title: '',
      categoryId: null,
      photo: ''
    }
    : editPhoto;

  const handleSubmit = values => {
    setTimeout(() => {
      dispatch(isAddMode ? addPhoto(values) : updatePhoto(values));
      history.push('/photos');
    }, 2000);
  }

  return (
    <div className="photo-edit">
      <Banner title="Pick your amazing photo 😎" />

      <div className="photo-edit__form">
        <PhotoForm
          isAddMode={isAddMode}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AddEditPage;
