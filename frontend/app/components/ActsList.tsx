import { useGetActs } from '../hooks/useGetActs';

export const ActsList = () => {
  const { acts, loading, errorMessage } = useGetActs();

  if (loading) return (<p>Loading...</p>);

  if (errorMessage) return (<p className="text-red-500">{errorMessage}</p>);

  if (acts.length === 0) return (<p>No acts created</p>);

  return acts?.map(act =>
    <div key={act.id}>
      <p>{act.title}</p>
      <p>{act.description}</p>
    </div>
  )
};