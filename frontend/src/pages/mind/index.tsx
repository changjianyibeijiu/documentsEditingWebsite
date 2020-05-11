import React, { Component } from 'react';

import GGEditor, { Mind } from 'gg-editor';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    const data = {
      label: 'Central Topic',
      children: [
        {
          label: 'Main Topic 1',
        },
        {
          label: 'Main Topic 2',
        },
        {
          label: 'Main Topic 3',
        },
      ],
    };
    return (
      <GGEditor>
        <Mind style={{ width: 500, height: 500 }} data={data} />
      </GGEditor>
    );
  }
}
