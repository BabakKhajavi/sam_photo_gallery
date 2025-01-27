import React, { FC, useEffect, useState } from 'react';
import { Select, MenuItem, Box, Typography } from '@mui/material';

interface PaginationInputProps {
  pageSize: number;
  pageNumber: number;
  dataLength: number | 0;
  pageInterval?: Array<number>;
  setPageSize: (pageSize: number) => void;
  setPageNumber: (pageNumber: number) => void;
}
export const SimplePagination: FC<PaginationInputProps> = ({
  pageSize,
  pageNumber,
  dataLength,
  pageInterval,
  setPageSize,
  setPageNumber,
}) => {
  const intervals = pageInterval || [10, 25];
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value);
    setPageNumber(1);
  };
  useEffect(() => {
    const fractionPageNumber = dataLength / pageSize;
    let newTotalPageNumber: number;
    if (dataLength % pageSize === 0) {
      newTotalPageNumber = parseInt(fractionPageNumber.toString());
    } else {
      newTotalPageNumber = parseInt(fractionPageNumber.toString()) + 1;
    }
    if (pageNumber === newTotalPageNumber) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
    setTotalPageNumber(newTotalPageNumber);
    window.scrollTo(0, 0);
  }, [pageSize, dataLength, pageNumber]);

  // const handleIncreasePage = () => {
  //   if (!isLastPage) {
  //     setPageNumber(pageNumber + 1);
  //   }
  // };
  // const handleDecreasePage = () => {
  //   if (pageNumber > 1) {
  //     setPageNumber(pageNumber - 1);
  //   }
  // };

  return (
    <Box>
      <Box>
        <Box>
          <Typography>Select Page Size:</Typography>
          <Select
            value={pageSize || 10}
            onChange={handlePageSizeChange}
            size="small"
            style={{ width: '80px' }}
          >
            {intervals.map((size, index) => (
              <MenuItem key={index} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          {/* <CustomIcon
            icon={faChevronLeft}
            isfirstpage={pageNumber === 1 ? 'true' : 'false'}
            onClick={handleDecreasePage}
          /> */}
          <Typography>{`${pageNumber} of ${totalPageNumber}`}</Typography>
          {/* <i
            icon={faChevronRight}
            islastpage={isLastPage.toString()}
            onClick={handleIncreasePage}
          /> */}
        </Box>
      </Box>
    </Box>
  );
};
