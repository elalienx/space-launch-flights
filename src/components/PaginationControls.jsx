export default function TableControls({ data, state }) {
  const [page, setPage] = state;
  const { hasPrevPage, hasNextPage, totalDocs, offset } = data;

  // Properties
  const recordStart = page * offset;
  const recordEnd = recordStart + offset;

  return (
    <section className="table-controls">
      <button
        disabled={!hasPrevPage}
        onClick={() => setPage((currentPage) => currentPage - 1)}
      >
        Prev
      </button>
      <span>
        Viewing page {page} ({recordStart}-{recordEnd} of {totalDocs})
      </span>
      <button
        disabled={!hasNextPage}
        onClick={() => setPage((currentPage) => currentPage + 1)}
      >
        Next
      </button>
    </section>
  );
}
