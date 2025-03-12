import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      <button
        onClick={handlePrevious}
        className="text-gray-600 hover:text-gray-900"
        disabled={currentPage === 1}
      >
        &larr; Previous
      </button>
      <span className="text-green-500 font-bold">{currentPage}</span>
      <span>{totalPages}</span>
      <button
        onClick={handleNext}
        className="text-gray-600 hover:text-gray-900"
        disabled={currentPage === totalPages}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;