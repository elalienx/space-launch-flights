export default function TableControls({ data, limit, state }) {
  const [page, setPage] = state;
  const { hasPrevPage, hasNextPage, totalDocs } = data;

  // Properties
  const recordStart = (page - 1) * limit + 1;
  const recordEnd = Math.min(recordStart + limit - 1, totalDocs);

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
