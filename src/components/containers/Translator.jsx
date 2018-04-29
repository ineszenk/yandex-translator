import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import MaterialDiv from './MaterialDiv';
import MaterialSnackbar from './MaterialSnackbar';
import Input from '../presentational/Input';
import Output from '../presentational/Output';
import config from '../../config';
import { 
  getTrans,
  getLangs 
} 
from '../../api';

class Translator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transVal: '',
      transLang: ''
    };

    this._getTrans = this._getTrans.bind(this);
  }

  componentDidMount() {
    this._getLangs(); 
  }

  render() {
    const langsList = this.state.langsList;
    const transVal = this.state.transVal;
    const transLang = this.state.transLang;

    return (
      <MaterialDiv>
        <Input
          langsList={langsList}
          translate={this._getTrans}
        />
        {
          transVal && transLang?
            <Output
              value={transVal}
              lang={transLang}
            />
          :
            null
        }
        <MaterialSnackbar
          ref="snackbar"
        />
      </MaterialDiv>
    );
  }

  _getLangs() {
    getLangs((err, langs) => {
      if (err) {
        this.refs.snackbar.show('Oops! An error occurred while fetching the data');
      } else {
        const langsList = [];
        Object.keys(langs).map(function(key, index) {
          langsList.push(<MenuItem value={key} key={index} primaryText={langs[key]} />);
        });
        this.setState({ langsList });  
        this.refs.snackbar.show('Languages fetched!');
      }
    });

    setTimeout(() => {
      this.refs.snackbar.dismiss();
    }, 1000);
  }
  
  _getTrans(target, to) {
    this.setState({ transLang: to });
    getTrans((transVal) => {
      this.setState({ transVal });
      this.refs.snackbar.show('Data Translated');
    }, target, to);

    setTimeout(() => {
      this.refs.snackbar.dismiss();
    }, 1000);
  }
}

export default Translator;
