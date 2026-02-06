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
    <div className="bg-surface rounded-md">
      <div className="p-20 sm:hidden flex items-center gap-8">
        <p className="font-bold text-lg text-foreground-muted">ACTS</p>
        <svg aria-label="Show Acts" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up-icon lucide-chevron-up rotate-90 w-18 h-18 cursor-pointer transition-all hover:opacity-60 duration-[0.15s] ease-in text-foreground-muted"><path d="m18 15-6-6-6 6" /></svg>
      </div>

      <div className="p-20 hidden sm:block">
        <div className="flex gap-5">
          <CreateActForm />
        </div>

        <ActsListDraggables initialActs={acts} />
      </div>
    </div>
  )
}
