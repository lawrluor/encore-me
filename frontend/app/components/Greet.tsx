import { JSX } from 'react';

type GreetProps = {
  name?: string
}

export const Greet = ({ name = "User" }: GreetProps): JSX.Element => {
  return (
    <p>Greetings {name}</p>
  )
}