'use client';

const Error = ({ error, reset }) => {
	return <div>
		<p>An unexpected error occurred</p>
		<p>{error.message}</p>
		<button onClick={reset}>Try again</button>
	</div>
}

export default Error;