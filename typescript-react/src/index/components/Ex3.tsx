import * as React from 'react';

interface Props {
  children?: any;
}

interface State {
  counter: number;
}

export default class Ex3 extends React.Component<Props, State> {
  static defaultProps = {
    children: 'click me'
  };

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
        {counter > 5 && `hello ${counter}`}
      </>
    )
  }
}