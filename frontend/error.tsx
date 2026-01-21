'use client'
const Error = ({ error }: { error: Error }) => {
  if (!error.message.includes('401')) return <p>Something went wrong. Please try again later.</p>;
  return <p>Please log in. <a href="/Signup">Go to Signup</a></p>;
}

export default Error;
