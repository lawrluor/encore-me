export const useDraggable = () => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item, idx: number) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ item, idx }));
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    /* try {
      const startIndex = String(e.dataTransfer.getData("application/json")?.idx);
      if (startIndex === dropIndex) return; 
    } catch(err) {
      console.error("Something went wrong while re-ordering.", err);
    } */
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number, state, setState) => {
    e.preventDefault();

    try {
      const draggedData = JSON.parse(e.dataTransfer.getData("application/json"));
      const startIndex = draggedData.idx;

      if (startIndex === dropIndex) return;

      let reorderedData = [...state];

      // Delete the current item (so when we re-insert it, we don't get a duplicate)
      // Insert the new item at the dropIndex
      // Add the rest of the items that were originally after the dropIndex
      reorderedData.splice(startIndex, 1);  // Remove 1 item at the startIndex
      reorderedData.splice(dropIndex, 0, draggedData.item);
      setState(reorderedData);
    } catch (err) {
      console.error("Something went wrong while re-ordering.", err);
    }
  }

  return { handleDragStart, handleDragOver, handleDrop };
}

