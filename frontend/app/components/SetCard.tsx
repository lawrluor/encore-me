import Link from 'next/link';

import { deleteSetAction, promoteSetAction } from '../actions/setActions';
import { Button } from '../components/Button';

type Props = {
  actId: string;
  set: {
    id: string;
    title: string;
    description?: string;
  }
}

export const SetCard = ({ actId, set }: Props) => {
  const deleteSetWithId = deleteSetAction.bind(null, set.id);
  const promoteSetWithId = promoteSetAction.bind(null, set.id);

  return (
    <div>
      {/*{deleteErrorMessage && <p className="text-red-500">{deleteErrorMessage}</p>}
      {promoteError && <p className="text-red-500">{promoteError.message}</p>}*/}
      <div className="gap-10 p-10 bg-accent">
        <div>
          <Link className="hover:opacity-80" href={{ pathname: `/Set/${set.id}`, query: { actId } }} draggable={false}><p className="font-bold">{set.title}</p></Link>
          <Button onClick={promoteSetWithId}>Promote</Button>
          <Button onClick={deleteSetWithId} aria-label="Delete Set"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></Button>
        </div>
        {set.description && <p>Description: {set.description}</p>}

      </div>
    </div>
  )
}