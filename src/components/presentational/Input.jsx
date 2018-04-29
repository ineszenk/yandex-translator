import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetStr: '',
      value: 'af',
    };
  }

  render() {
    const langsList = this.props.langsList;
    const styleContainer = {
      width: '100%'
    }
    const styleSelect = {
      float: 'left'
    }
    const styleRaisedButton = {
      marginLeft: 15,
    };

    return (
      <div
        style={styleContainer}
      >
        <h1>Input</h1>
        <TextField
          style={styleContainer}
          value={this.state.targetStr}
          hintText="Input String"
          onChange={(e) => {
            this.setState({targetStr: e.target.value});
          }}
        />
        <h4>Select language to translate</h4>
        <SelectField
          value={this.state.value}
          onChange={(event, index, value) => {
            this.setState({ value });
          }}
          maxHeight={400}
          style={styleSelect}
        >
          {langsList}
        </SelectField>
        <RaisedButton
          label="Translate"
          primary={true}
          style={styleRaisedButton}
          onClick={(e) => this._handleClick()}
        />
      </div>
    );
  }

  _handleClick() {
    const to = this.state.value;
    const targetStr = this.state.targetStr;
    this.props.translate(targetStr, to);
  }
}

Input.propTypes = {
  langsList: PropTypes.array,
  translate: PropTypes.func
}

export default Input;
