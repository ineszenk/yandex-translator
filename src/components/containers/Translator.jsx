import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import MaterialDiv from './MaterialDiv';
import MaterialSnackbar from './MaterialSnackbar';
import Input from '../presentational/Input';
import Output from '../presentational/Output';
import config from '../../config';
import { 
  getTrans,
  getLangs,
  sysnthesisLangs
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
    this._getSysthesisLangs();
  }

  render() {
    const langsList = this.state.langsList;
    const transVal = this.state.transVal;
    const transLang = this.state.transLang;
    const showAudio = this.state.showAudio;

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
              showAudio={showAudio}
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
        this.setState({ langs });
        const langsList = [];
        Object.keys(langs).map((key, index) => {
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
    const sysLangs = this.state.sysLangs;
    this.setState({ transLang: to });
    
    getTrans((transVal) => {
      this.setState({ transVal });
      this.refs.snackbar.show('Data Translated');
      if (sysLangs.includes(to)) {
        this.setState({ showAudio: true });
      } else {
        this.setState({ showAudio: false });
      }
    }, target, to);

    setTimeout(() => {
      this.refs.snackbar.dismiss();
    }, 1000);
  }
  
  _getSysthesisLangs() {
    sysnthesisLangs((sysLangs) => {
      this.setState({ sysLangs });
    }) 
  }
}

export default Translator;
