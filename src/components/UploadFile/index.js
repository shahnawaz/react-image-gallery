import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
  uploadPhoto
} from "../../actions";
import {GridTile} from 'material-ui/GridList';
import PropTypes from 'prop-types';

class UploadFile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataUri: ''
    };
    this.startUpload = this.startUpload.bind(this);
    this.onUploadComplete = this.onUploadComplete.bind(this);
  }

  componentWillMount(){
    let that = this;
    let reader = new FileReader();
    reader.onload = function(e){
      that.setState({
        dataUri: e.target.result,
        id: that.props.file.id,
        createdAt: that.props.file.createdAt
      });
      that.startUpload();
    };
    reader.readAsDataURL(this.props.file);
  }

  startUpload(){
    let that = this;
    // to avoid mounting issue
    setTimeout(function () {
      that.props.actions.uploadPhoto(that.state);
      that.onUploadComplete();
    }, 500);
  }

  onUploadComplete(){
    this.props.onUploadComplete(this.state.id);
  }

  render() {
    return (
      <GridTile
        key={this.props.index}
        title={'Uploading..'}
        style={{
          border: '1px solid rgba(0,0,0,0.17)'
        }}
      >
        <img src={this.state.dataUri} />
      </GridTile>
    );
  }
}

UploadFile.propTypes = {
  file: PropTypes.object,
  onUploadComplete: PropTypes.func,
  index: PropTypes.number,
};

function mapStateToProps() {
  return {};
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      uploadPhoto
    }, dispatch)
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(UploadFile);
