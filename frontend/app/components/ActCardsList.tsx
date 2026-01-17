import { useGetActs } from '../hooks/useGetActs';

import { ActCard } from './ActCard';

export const ActCardsList = () => {
  const { acts, loading, errorMessage } = useGetActs();

  if (loading) return (<p>Loading...</p>);

  if (errorMessage) return (<p className="text-red-500">{errorMessage}</p>);

  if (acts.length === 0) return (<p>No acts created</p>);

  return (
    <div className="flex flex-col gap-10">
      {acts.map(act => <ActCard key={act.id} act={act} />)}
    </div>
  )
};