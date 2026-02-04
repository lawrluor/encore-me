type Props = {
  className?: string;
}

export const Brand = ({ className }: Props) => {
  return (
    <span className={`font-brand text-4xl tracking-widest ${className}`}>
      encore
    </span>
  )
}
