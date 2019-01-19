import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  handleSubmit = async e => {
    console.log('Submit!');
    e.preventDefault();

    try {
      await axios.post('/api/values', {
        index: this.state.index
      });
      this.setState({
        index: ''
      });

      this.fetchValues();
      this.fetchIndexes();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({
      values: values.data
    });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  renderSeenIndexes() {
    const { seenIndexes } = this.state;
    return seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];
    const { values } = this.state;
    return (
      <table className="result-table">
        <tbody>
          {Object.keys(values).map(key => {
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>=></td>
                <td>{values[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            autoFocus
            value={this.state.index}
            onChange={e => {
              this.setState({ index: e.target.value });
            }}
          />
          <button type="submit">Submit</button>
        </form>

        <h3>Indexes seen:</h3>
        {this.renderSeenIndexes()}
        <h3>Calculated values</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
