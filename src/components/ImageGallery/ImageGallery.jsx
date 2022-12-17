import PropTypes from 'prop-types';
import { ImageGalleryItem } from "./ImageGalleryItem";
import { ImageGalleryWrapper } from "./ImageGallery.styled";

export const ImageGallery = ({ images, onOpenModal }) => (
  <ImageGalleryWrapper className="gallery">
    {images.map(image => (
      <ImageGalleryItem image={image} onOpenModal={onOpenModal} />
    ))}
  </ImageGalleryWrapper>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape()),
  onOpenModal: PropTypes.func.isRequired,
};
