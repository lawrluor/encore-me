import Image from 'next/image';
import Link from 'next/link';

import { useDeleteAct } from '../hooks/useDeleteAct';

import { SetsList } from './SetsList';

type Props = {
  act: {
    id: string,
    name: string,
    description: string,
    qr_code: string
  }
}

export const ActCard = ({ act }: Props) => {
  const { state, executeDelete, pending: deletePending } = useDeleteAct();

  const handleDelete = async () => {
    await executeDelete(act.id);
  }

  return <div key={act.id} className="p-10 border-1 border-solid border-white rounded-md">
    {state?.error && <p className="text-red-500">{state.error}</p>}
    {state?.success && <p className="text-green-500">{state.success}</p>}
    <div className="flex gap-10">
      <Link className="hover:opacity-80" href={{ pathname: 'Sets', query: { actId: act.id } }}><p>{act.name}</p></Link>
      <button type="button" className={`${deletePending ? 'cursor-loading' : 'cursor-pointer'}`} onClick={handleDelete} disabled={deletePending} aria-label="Delete Act"><svg className="text-red-500 lucide lucide-trash-icon lucide-trash" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></button>
    </div>
    <p className="opacity-80 text-sm">{act.description}</p>
    <div className="py-20">
      <h2>Sets</h2>
      <SetsList actId={act.id} />
    </div>
    <div>
      <Image src={act.qr_code} alt="QR Code" width={200} height={200} />
    </div>
  </div>
}

