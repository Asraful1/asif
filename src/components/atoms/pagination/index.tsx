interface PaginationProps {
  projectsPerPage: number;
  totalProjects: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export function Pagination({
  projectsPerPage,
  totalProjects,
  paginate,
  currentPage,
}: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                currentPage === number
                  ? "bg-white text-black"
                  : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
