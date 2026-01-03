import { useGetSetlists } from '../hooks/useGetSetlists';

type Props = {
  actId: string
}

export const Setlist = ({ actId }: Props) => {
  const { data, loading, errorMessage } = useGetSetlists({ actId });

  if (loading) return <p>Loading...</p>;

  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  if (data.length === 0) return <p>No setlists created yet.</p>;

  return data.map((setlist) => <div key={setlist.id}>
    <p className="text-bold">{setlist.title}</p>
    {setlist.description && <p>{setlist.description}</p>}
  </div>
  )
}