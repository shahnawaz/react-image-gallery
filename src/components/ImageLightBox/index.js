import React, {Component} from 'react';
import Lightbox from 'react-image-lightbox';
import DeleteSVG from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';

class ImageLightBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      photos: []
    };
  }

  componentWillReceiveProps(nextProps){
    let photos = [];
    nextProps.photos.map(function(photo){
      photos.push(photo.dataUri);
    });
    this.setState({
      photos,
      photoIndex: nextProps.clickedPictureIndex
    });
  }


  render() {
    const { photoIndex } = this.state;
    return (
      <div>
        {this.props.isOpen && this.state.photos.length>0 && (
          <div>
            <Lightbox
              mainSrc={this.state.photos[photoIndex]}
              nextSrc={this.state.photos[(photoIndex + 1) % this.state.photos.length]}
              prevSrc={this.state.photos[(photoIndex + this.state.photos.length - 1) % this.state.photos.length]}
              onCloseRequest={() => this.props.onClose()}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + this.state.photos.length - 1) % this.state.photos.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % this.state.photos.length,
                })
              }
            />
            <IconButton
              onClick={()=>{this.props.onPictureDelete(this.props.photos[this.state.photoIndex].id);}}
              style={{
                position: 'fixed',
                top: '2px',
                right: '139px',
                zIndex: '100000'
              }}
            >
              <DeleteSVG color="white" />
            </IconButton>
          </div>
        )}
      </div>
    );
  }
}

ImageLightBox.propTypes = {
  photos: PropTypes.array,
  clickedPictureIndex: PropTypes.number,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onPictureDelete: PropTypes.func
};

export default ImageLightBox;
