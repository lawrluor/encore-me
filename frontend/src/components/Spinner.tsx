type Props = {
	color?: string
}

export const Spinner = ({ color="white" }: Props) => {
	return <div className={`rounded-full border-1 border-${color} w-[20px] h-[20px]`} aria-label="Loading"></div>
}