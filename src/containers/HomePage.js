import React from 'react';
import FlatPagination from 'material-ui-flat-pagination';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
  getPhotos,
  deletePhotos
} from "../actions";
import PropTypes from 'prop-types';

import {GridList} from 'material-ui/GridList';

import Header from '../components/Header';
import UploadFile from '../components/UploadFile';
import ImageLightBox from '../components/ImageLightBox';
import PhotoTile from '../components/PhotoTile';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '40px',
    marginBottom: '40px',
    minHeight: '364px'
  },
  gridList: {
    width: '80%',
    overflowY: 'auto',
  },
};

class HomePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      toUpload: [],
      isLightBoxOpen: false,
      clickedPictureIndex: null,
      currentPhotos: [],
      pagination: {
        offset: 0,
        limit: 8
      },
      showError: false
    };
    this.onImageAddClick = this.onImageAddClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onPicturesSelected = this.onPicturesSelected.bind(this);
    this.onUploadComplete = this.onUploadComplete.bind(this);
    this.onPictureDelete = this.onPictureDelete.bind(this);
    this.onPictureClick = this.onPictureClick.bind(this);
    this.toggleLightBox = this.toggleLightBox.bind(this);
    this.paginationOffsetChange = this.paginationOffsetChange.bind(this);
    this.updateCurrentPhotos = this.updateCurrentPhotos.bind(this);
  }

  componentWillMount(){
    this.props.actions.getPhotos();
  }

  componentWillReceiveProps(nextProps){
    this.updateCurrentPhotos(nextProps.photos, this.state.pagination.offset);
  }

  onImageAddClick(){
    document.getElementById('filePicker').click();
  }

  onChange(e){
    if(e.target.files && e.target.files.length>0)
      this.onPicturesSelected(e.target.files);
  }

  onPicturesSelected(fileList){
    let showError = false;
    fileList = [...fileList].filter((file)=>{
      file.id = (new Date()).getTime().toString()+file.lastModified.toString();
      file.createdAt = (new Date()).getTime();
      if(!(file.size >= 5000000)){
        return file;
      }
      else{
        showError = true;
      }
    });
    this.setState({
      toUpload: [...this.state.toUpload, ...fileList],
      showError
    });
  }

  onUploadComplete(fileId) {
    let toUpload = [...this.state.toUpload].filter(function(file){
      if(file.id !== fileId){
        return file;
      }
    });
    this.setState({
      toUpload
    });
  }

  onPictureDelete(photoId){
    this.props.actions.deletePhotos(photoId);
  }

  toggleLightBox(){
    this.setState({
      isLightBoxOpen: !this.state.isLightBoxOpen
    });
  }

  onPictureClick(photoIndex){
    this.toggleLightBox();
    this.setState({
      clickedPictureIndex: this.state.pagination.offset+photoIndex
    });
  }

  paginationOffsetChange(offset) {
    this.setState({
      pagination: Object.assign({}, this.state.pagination, {offset: offset})
    });
    this.updateCurrentPhotos(this.props.photos, offset);
  }

  updateCurrentPhotos(photos, offset){
    let currentPhotos;
    currentPhotos = photos.filter((photo, index)=>{
      if(index >= offset && index < offset+this.state.pagination.limit){
        return photo;
      }
    });
    this.setState({
      currentPhotos
    });
  }

  render(){
    return (
      <div>
        {/* Header */}
        <Header onRightClick={this.onImageAddClick}/>
        {/* Input to accept images - invisible */}
        <input type="file" name="file" id="filePicker" ref="filePicker" accept="image/png, image/jpeg"
               style={{height: 0, width: 0, visibility: 'hidden'}} multiple={true} onChange={this.onChange}/>
        {
          this.state.showError?
            <h4 style={{textAlign: 'center', fontFamily: 'Roboto', color: '#e57373'}}>
              Please upload images less than 5MB in size as the data is being saved in Local Storage. Otherwise, it will make your browser to run slow.
            </h4>
            :
            null
        }
        {/* Grid Layout */}
        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
            cols={4}
          >
            {/* To Upload Photos */}
            {
              this.state.toUpload.map((file, index) => (
                <UploadFile file={file} index={index} key={index} onUploadComplete={this.onUploadComplete}/>
              ))
            }
            {/* Photo Tile/List */}
            {
              this.state.currentPhotos.map((photo, index) => {
                  return <PhotoTile photo={photo} onPictureDelete={this.onPictureDelete} key={index} index={index} onClick={this.onPictureClick}/>;
              })
            }
          </GridList>
        </div>
        {/* Pagination */}
        <FlatPagination
          offset={this.state.pagination.offset}
          limit={this.state.pagination.limit}
          total={this.props.photos.length}
          onClick={(e, offset) => this.paginationOffsetChange(offset)}
          style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}
        />
        {/* Image Light Box */}
        <ImageLightBox
          photos={this.props.photos}
          clickedPictureIndex={this.state.clickedPictureIndex}
          isOpen={this.state.isLightBoxOpen}
          onClose={this.toggleLightBox}
          onPictureDelete={this.onPictureDelete}
        />
      </div>
    );
  }

}

HomePage.propTypes = {
  photos: PropTypes.array,
  actions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    photos: state.photos
  };
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getPhotos,
      deletePhotos
    }, dispatch)
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(HomePage);

