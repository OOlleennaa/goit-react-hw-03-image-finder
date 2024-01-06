import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from 'API';
import { Searchbar } from '../Searchbar/Searchbar';
import { Gallery } from '../ImageGallery/ImageGallery';
import { Pagination } from '../LoadMore/LoadMore';
import { Wrapper } from './App.styled'
import { Loader } from '../Loader/Loader'
import {notifyInfo, notifyInputQuerry, success} from '../Notify/Notify'

export class App extends Component {
  state = {
    query: '',
    error: false,
    loading: false,
    prevQuery: '',
    images: [],
    page: 1,
    showLoadMoreButton: true,
    searchFailed: false
  };


  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1
    });
    
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const prevQuery = prevState.query;
    const searchQuery = this.state.query;
    const prevPage = prevState.page;
    const nexPage = this.state.page;

    if (prevQuery !== searchQuery || prevPage !== nexPage) {
      this.loadResult();
      
    }
  };

  loadResult = async () => {
    const searchQuery = this.state.query;
    const nexPage = this.state.page;

    try {
      this.setState({ loading: true });
      const { hits, totalHits }  = await fetchImages(searchQuery, nexPage);

      if (hits.length) {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits], loadMore: this.state.page < Math.ceil(totalHits / 12 )
        }));
        success(searchQuery);
        
        this.setState({ loading: false, showLoadMoreButton: false});
      } else {
        notifyInfo();
        this.setState({ loading: false, 
          error: false });
      }
       } 
    
    catch (error) {
      console.log(error);
      this.setState({ error : true });
    }

  };
 
  handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.elements.query.value.trim() === '') {
      notifyInputQuerry();
      return;
    }
    this.changeQuery(evt.target.elements.query.value);


    evt.target.reset();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  

  render () {
    const { loading, images, ErrorMsg, searchFailed } = this.state;
    return (
      <Wrapper>
        <Searchbar onSubmit={ this.handleSubmit } />
        { loading && <Loader /> }
        { images.length > 0 && <Gallery imgItems={ images } /> } 
        { searchFailed && images.length === 0 && !loading && (
        <ErrorMsg>Such images was not found, try find something else 😉</ErrorMsg>)}
        { images.length > 0 && <Pagination onClick={ this.handleLoadMore }>Load More</Pagination> }
        <Toaster position="top-right" reverseOrder={true}/>
      </Wrapper>
    )
  }
};