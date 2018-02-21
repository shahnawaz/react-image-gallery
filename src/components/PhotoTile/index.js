import React, {Component} from 'react';
import {GridTile} from 'material-ui/GridList';
import DeleteSVG from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';

class PhotoTile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <GridTile
        title={new Date(this.props.photo.createdAt).toLocaleString()}
        style={{
          border: '1px solid rgba(0,0,0,0.17)'
        }}
        actionIcon={<IconButton onClick={()=>{this.props.onPictureDelete(this.props.photo.id);}}><DeleteSVG color="white" /></IconButton>}
        actionPosition="right"
      >
        <img src={this.props.photo.dataUri} style={{cursor: 'pointer'}} onClick={()=>this.props.onClick(this.props.index)} />
      </GridTile>
    );
  }
}

PhotoTile.propTypes = {
  photo: PropTypes.object,
  onPictureDelete: PropTypes.func,
  index: PropTypes.number,
  onClick: PropTypes.func
};


export default PhotoTile;
