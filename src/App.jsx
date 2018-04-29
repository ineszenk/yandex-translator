import React from 'react';
import Translator from './components/containers/Translator';
import MaterialAppBar from './components/containers/MaterialAppBar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <MaterialAppBar 
          title="Language Translator"
          showMenuIconButton={false}
        />
        <Translator />
      </div>
    );
  }
}

export default App;
