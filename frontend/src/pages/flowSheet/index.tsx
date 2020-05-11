import React, { Component } from 'react';

import GGEditor, { Flow } from 'gg-editor';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    const data = {
      nodes: [
        {
          id: '0',
          label: 'Node',
          x: 55,
          y: 55,
        },
        {
          id: '1',
          label: 'Node',
          x: 55,
          y: 255,
        },
      ],
      edges: [
        {
          label: 'Label',
          source: '0',
          target: '1',
        },
      ],
    };

    return (
      <GGEditor>
        <Flow style={{ width: 500, height: 500 }} data={data} />
      </GGEditor>
    );
  }
}
