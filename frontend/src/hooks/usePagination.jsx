import React, { useState, useMemo, useEffect } from 'react';

export const usePagination = (data, initialItemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset to page 1 if data length changes drastically
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const paginatedData = useMemo(() => {
    if (!data) return [];
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(newPage);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 200); // 200ms fade out duration
    }
  };

  const handleItemsPerPageChange = (newCount) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setItemsPerPage(Number(newCount));
      setCurrentPage(1);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    itemsPerPage,
    isTransitioning,
    handlePageChange,
    handleItemsPerPageChange,
    totalItems: data?.length || 0
  };
};

export const PaginatedView = ({ isTransitioning, children }) => {
  return (
    <div style={{
      opacity: isTransitioning ? 0 : 1,
      transform: isTransitioning ? 'translateY(8px)' : 'translateY(0)',
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
      width: '100%'
    }}>
      {children}
    </div>
  );
};
