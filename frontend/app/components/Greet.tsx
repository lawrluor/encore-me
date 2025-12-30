type GreetProps = {
  name?: string
}

export const Greet = ({ name = "User" }: GreetProps) => {
  return (
    <p>Greetings {name}</p>
  )
}