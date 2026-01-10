import Link from 'next/link';
import { useDeleteAct } from '../hooks/useDeleteAct';
import { SetsList } from './SetsList';

type Props = {
  act: {
    id: string,
    title: string,
    description: string
  }
}

export const ActCard = ({ act }: Props) => {
  const { executeDelete, loading: deleteLoading, errorMessage } = useDeleteAct();

  const handleDelete = async () => {
    const success = await executeDelete(act.id);
    console.log(success); // potentially show a specific UI if desired, such as success!
  }

  return <div key={act.id} className="p-10 border-1 border-solid border-white width-100">
    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    <div className="flex gap-10">
      <Link href={{ pathname: 'Sets', query: { actId: act.id } }}><p>{act.title}</p></Link>
      <button type="button" className="cursor-pointer" onClick={handleDelete} disabled={deleteLoading} aria-label="Delete Act"><svg className="text-red-500 lucide lucide-trash-icon lucide-trash" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></button>
    </div>
    <p className="opacity-80 text-sm">{act.description}</p>
    <div className="py-20">
      <h2>Sets</h2>
      <SetsList actId={act.id} />
    </div>
  </div >
}

