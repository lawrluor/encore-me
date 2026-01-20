import { getActsAction } from '../actions/actActions';
import { ActsListDraggables } from '../components/ActsListDraggables';
import { CreateActForm } from '../components/CreateActForm';

export const ActsList = async () => {
  const acts = await getActsAction();

  return (
    <div className="p-20">
      <div>
        <h2 className="text-bold text-xl">ACTS</h2>
        <CreateActForm />
      </div>

      <ActsListDraggables initialActs={acts} />
    </div>
  )
}
