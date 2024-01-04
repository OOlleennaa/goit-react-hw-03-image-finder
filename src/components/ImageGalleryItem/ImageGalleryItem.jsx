import { Component } from 'react';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { ImageGalleryItemImg } from './ImageGalleryItem.styled';

const customStyles = {
  content: {
    top: '52%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    maxWidth: 'calc (100vw - 48px)',
    maxHeight: 'calc(100vh - 24px)',
    overflow: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
};

Modal.setAppElement('#root');

export class GalleryImage extends Component {
    constructor () {
        super();
        this.state = {
            showModal: false
  };
  this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal () { this.setState({ showModal: true });}
  closeModal () { this.setState({ showModal: false });}

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.item;
    // const { isModalOpen } = this.state;
    return (
      <div>
        <ImageGalleryItemImg
          src={webformatURL}
          alt={tags}
          load="lazy"
          onClick={this.openModal}
        />
        <Modal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.closeModal}
          style={customStyles}
         >
          <img src={largeImageURL} alt={tags} />
        </Modal>
      </div>
    );
  }
}

// const props = {};

// ReactDOM.render(<GalleryImage {...props} />, document.getElementById('root'))