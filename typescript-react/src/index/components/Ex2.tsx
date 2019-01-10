import * as React from 'react';

interface Props {
  firstName: string,
  lastName: string
}

// JSX 리턴을 하지 않을 경우 에러가 Ex2가 아닌 index.tsx 에서 발생
// https://github.com/Mercateo/react-with-typescript#stateless-functional-components
/*
export default ({firstName, lastName}: Props) => (
  <div>
    {firstName} {lastName}
  </div>
);
*/

// React.StatelessComponent 와 React.SFC 는 deprecated 됨
const Ex2: React.FunctionComponent<Props> = ({firstName, lastName}) => (
  <div>
    {firstName} {lastName}
  </div>
);

export default Ex2;
