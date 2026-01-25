import { ActsListDraggables } from '../components/ActsListDraggables';
import { CreateActForm } from '../components/CreateActForm';
import { getActs } from '../services/actService';

export const ActsList = async () => {
  const acts = await getActs();

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
