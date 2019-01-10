import * as React from 'react';

interface Props {
  children: any;
}

interface State {
  counter: number;
}

export default class Ex3 extends React.Component<Props, State> {
  state = {
    counter: 0
  };

  handleClick = (): void => {
    const { counter } = this.state;

    this.setState({
      counter: counter + 1
    });
  };

  render() {
    const { children } = this.props;
    const { counter } = this.state;
    return (
      <>
        <button onClick={this.handleClick}>{children}</button>
        <div>{counter}</div>
      </>
    )
  }
}