import { ActsListDraggables } from '../components/ActsListDraggables';
import { CreateActForm } from '../components/CreateActForm';
import { getActs } from '../services/actService';
import { type Act } from '../types/act';

type Props = {
  acts?: Act[];
}

export const ActsList = async ({ acts }: Props) => {
  // acts must be an array or undefined
  // if acts is an array at all, it must have come from user tree data
  // if not an array, must have been undefined and we must fetch it
  if (!acts) acts = await getActs();

  // Better to create new variable than reassign props, which should be treated as immutable
  // resolvedActs = acts ?? await getActs();
  return (
    <div className="p-10 bg-surface rounded-md">
      <div className="flex gap-5">
        <CreateActForm />
      </div>

      <ActsListDraggables initialActs={acts} />
    </div>
  )
}
