import { useGetSets } from '../hooks/useGetSets';

type Props = {
  actId: string
}

export const SetsList = ({ actId }: Props) => {
  const { data, loading, errorMessage } = useGetSets({ actId });

  if (loading) return <p>Loading...</p>;

  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  if (data.length === 0) return <p>No sets created yet.</p>;

  return data.map((set) => <div key={set.id}>
    <p className="text-bold">{set.title}</p>
    {set.description && <p>{set.description}</p>}
  </div>
  )
}