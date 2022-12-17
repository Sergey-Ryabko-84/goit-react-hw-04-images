import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onOpenModal }) => (
  <Item
    key={image.id}
    onClick={() => onOpenModal(image.largeImageURL)}
    className="gallery-item"
  >
    <Image src={image.webformatURL} alt={image.tags} />
  </Item>
);

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onOpenModal: PropTypes.func.isRequired,
};
