import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';

import Images from 'constants/images';
import Banner from 'components/banner';
import PhotoList from 'features/photo/components/photo-list';

import { removePhoto } from 'features/photo/photo-slice';

const MainPage = props => {
  const photos = useSelector(({ photos }) => photos);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePhotoEditClick = photo => history.push(`/photos/${photo.id}`);

  const handlePhotoRemoveClick = photo => dispatch(removePhoto(photo.id));

  return (
    <div className="photo-main">
      <Banner title="Your awesome photos 🎉" backgroundUrl={Images.PINK_BG} />

      <Container className="text-center">
        <div className="py-5">
          <Link to="/photos/add">Add new photo</Link>
        </div>

        <PhotoList
          photoList={photos}
          onPhotoEditClick={handlePhotoEditClick}
          onPhotoRemoveClick={handlePhotoRemoveClick}
        />
      </Container>
    </div>
  );
};

MainPage.propTypes = {};

export default MainPage;
