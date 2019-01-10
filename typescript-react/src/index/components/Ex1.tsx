import * as React from 'react';

interface Props {
  firstName: string;
  lastName: string;
}

export default class Ex1 extends React.Component<Props> {
  render() {
    const { firstName, lastName } = this.props;

    return (
      <div>
        {firstName} {lastName}
      </div>
    )
  }
}
