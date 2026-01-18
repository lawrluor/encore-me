const EditSet = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/songs`);
  const songs = await response.json().data;

  return <div>
    <h2>Recent Songs</h2>
    {songs}
  </div>
}

export default EditSet;