import { useState, useEffect, useLayoutEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from './Button/Button';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../api';
import { AppWrapper } from './App.styled';
import { smoothlyScroll } from './smoothlyScroll';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query.trim() === '') return;

    const fetchData = async () => {
      setLoading(true);
      const response = await fetchImages(query, page);
      setImages(state => {
        if (state) {
          return [...state, ...response.hits]
        } else {
          return response.hits
        };
      });
      setTotalHits(response.totalHits);
      setLoading(false);
    };

    try {
      fetchData();
    } catch {
      setError(true);
    }
    
  }, [query, page]);

  useLayoutEffect(() => {
    setTimeout(() => {
      if (page > 1) smoothlyScroll();
    }, 300)
  }, [page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setImages(null);
    setPage(1);
    setTotalHits(0);
    setLargeImageURL(null);
    setLoading(false);
    setError(false);
  };

  const handleLoadMore = () => setPage(state => state + 1);

  const toggleModal = imageURL =>
    largeImageURL ? setLargeImageURL(null) : setLargeImageURL(imageURL);

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
      <Searchbar onSubmit={handleFormSubmit} />
      {images && <ImageGallery images={images} onOpenModal={toggleModal} />}
      {loading && <Loader />}
      {images && images.length < totalHits && (
        <Button onLoadMore={handleLoadMore} />
      )}
      {largeImageURL && (
        <Modal img={largeImageURL} tags={query} onCloseModal={toggleModal} />
      )}
    </AppWrapper>
  );
};
