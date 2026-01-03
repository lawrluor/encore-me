import { useGetActs } from '../hooks/useGetActs';
import { SetsList } from './SetsList';

export const ActsList = () => {
  const { acts, loading, errorMessage } = useGetActs();

  if (loading) return (<p>Loading...</p>);

  if (errorMessage) return (<p className="text-red-500">{errorMessage}</p>);

  if (acts.length === 0) return (<p>No acts created</p>);

  return acts.map(act =>
    <div key={act.id} className="py-5">
      <p>{act.title}</p>
      <p className="opacity-80 text-sm">{act.description}</p>
      <SetsList actId={act.id} />
    </div>
  )
};