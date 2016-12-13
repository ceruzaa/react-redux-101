import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      inputText: '',
    };
  }

  add() {
    this.props.dispatch(new ActionCreator().addListItem(this.state.inputText));
  }

  clear() {
    this.props.dispatch(new ActionCreator().clearList());
  }

  updateTextField(evt) {
    this.setState({
      inputText: evt.target.value,
    });
  }

  render () {
    return (
      <div>
        <h4> Hello World från dbwebb! </h4>
        <input
         type="text"
         value={this.state.inputText}
         onChange={this.updateTextField.bind(this)}
        />
        <button onClick={this.add.bind(this)}> Lägg till </button>
        <button onClick={this.clear.bind(this)}> Rensa listan </button>
        <ul>
          {
            this.props.lines.map(function (line, index) {
              return <li key={index}> {index} : {line}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

class ActionCreator {
  addListItem(text) {
    return {
      type: 'ADD_LIST_ITEM',
      text: text,
    };
  }

  clearList() {
    return {
      type: 'CLEAR_LIST',
    };
  }
}

const reducer = function (state, action) {
  switch (action.type) {
    case 'ADD_LIST_ITEM':
      return Object.assign({}, state, {
        lines: [action.text, ...state.lines],
      });

    case 'CLEAR_LIST':
      return Object.assign({}, state, {
        lines: [],
      });

    default:
      return state;
  }
};

const store = createStore(reducer, {
  lines: ['Hello World'],
});

function mapStateToProps(state) {
  return state;
}

let ConnectedApp = connect(mapStateToProps)(App);

render(
    <Provider store={store}>
      <ConnectedApp />
    </Provider>,
    document.getElementById('app'),
);
