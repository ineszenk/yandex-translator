import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import VolumeUp from 'material-ui/svg-icons/av/volume-up';
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
    const lang = this.props.lang;
    const styleContainer = {
      width: '100%'
    }
    const floatLeft = {
      float: 'left',
      marginTop: '16px'
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
        <IconButton
          tooltip="Listen"
          onClick={(e) => speakTrans(value, lang)}
        >
          <VolumeUp />
        </IconButton>
      </div>
    );
  }
}

Output.propTypes = {
  value: PropTypes.string,
  lang: PropTypes.string
}

export default Output;
