import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../api'
import { AppWrapper } from './App.styled';
import {smoothlyScroll} from './smoothlyScroll'

export class App extends Component {
  state = {
    query: '',
    images: null,
    page: 1,
    totalHits: 0,
    largeImageURL: null,
    loading: false,
    error: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, largeImageURL } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
      try {
        const response = await fetchImages(query, page);
        if (this.state.images)
          this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
          }));
        else
          this.setState({
            images: response.hits,
            totalHits: response.totalHits,
          });
      } catch {
        this.setState({ error: true });
      } finally {
        this.setState({ loading: false });
      }
    }
    if (page > 1 && largeImageURL === null) smoothlyScroll();
  }

  handleFormSubmit = query => {
    this.setState({
      query,
      images: null,
      page: 1,
      totalHits: 0,
      largeImageURL: null,
      loading: false,
      error: false,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = largeImageURL => {
    if (this.state.largeImageURL) this.setState({ largeImageURL: null });
    else this.setState({ largeImageURL });
  };

  render() {
    const { query, images, largeImageURL, loading, totalHits, error } =
      this.state;
    query !== '' &&
      images !== null &&
      images.length === 0 &&
      toast('Nothing found. Please enter another request');
    images &&
      images.length === totalHits &&
      images.length > 0 &&
      toast('All images uploaded!');
    error && toast.error('Something went wrong. Please try once more.');
    return (
      <AppWrapper>
        <GlobalStyle />
        <Toaster position="top-right" />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images && (
          <ImageGallery images={images} onOpenModal={this.toggleModal} />
        )}
        {loading && <Loader />}
        {images && images.length < totalHits && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        {largeImageURL && (
          <Modal img={largeImageURL} tags={query} onCloseModal={this.toggleModal} />
        )}
      </AppWrapper>
    );
  }
}
