type Props = {
  uri: string;
  className?: string;
}

export const QRCode = ({ uri, className }: Props) => {
  return (
    <div
      className={`w-[200px] h-[200px] ${className}`}
      style={{
        maskImage: `url("${uri}")`,
        WebkitMaskImage: `url("${uri}")`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}