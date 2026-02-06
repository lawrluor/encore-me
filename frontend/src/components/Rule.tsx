type Props = {
  className?: string;
}

export const Rule = ({ className }: Props) => {
  return <div className={`border-b-1 border-foreground-xmuted opacity-60 w-full ${className}`}></div>
}