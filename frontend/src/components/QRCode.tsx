import Image from 'next/image';

export const QRCode = ({ uri }: { uri: string }) => {
  return (
    <Image src={uri} alt="User QR Code" width={200} height={200} />
  )
}