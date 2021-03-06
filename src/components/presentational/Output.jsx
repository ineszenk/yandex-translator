import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import VolumeUp from 'material-ui/svg-icons/av/volume-up';
import MaterialSnackbar from '../containers/MaterialSnackbar';
import {
  speakTrans
}
from '../../api';

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const value = this.props.value;
    const showAudio = this.props.showAudio;
    const styleContainer = {
      width: '100%'
    }
    const floatLeft = {
      float: showAudio ? 'left' : 'none',
      marginTop: '15px'
    }

    return (
      <div
        style={styleContainer}
      >
        <h1>Translation</h1>
        <p
          style={floatLeft}
        >
          {value}
        </p>
        {
          showAudio ?
            <IconButton
              tooltip="Listen"
              onClick={(e) => this._speakTrans()}
            >
              <VolumeUp />
            </IconButton>
          : 
            null
        }
        <MaterialSnackbar
          ref="snackbar"
        />
      </div>
    );
  }

  _speakTrans() {
    const value = this.props.value;
    const lang = this.props.lang;
    speakTrans((err) => {
      if (err) {
        this.refs.snackbar.show('Language not supported by SpeechSynthesis');
      }
    }, value, lang);

    setTimeout(() => {
      this.refs.snackbar.dismiss();
    }, 1000);
  }
}

Output.propTypes = {
  value: PropTypes.string,
  lang: PropTypes.string,
  showAudio: PropTypes.bool
}

export default Output;
