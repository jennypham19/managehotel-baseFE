import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select, { selectClasses } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

export interface ProTablePaginationProps {
  limit: number;
  page: number;
  rowsPerPageOptions?: number[];
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (limit: number) => void;
}

const ProTablePagination = (props: ProTablePaginationProps) => {
  const {
    limit,
    page,
    total,
    onPageChange,
    onPageSizeChange,
    rowsPerPageOptions = [10, 25, 50, 100],
  } = props;
  const { t } = useTranslation('common');

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    onPageSizeChange(Number(event.target.value));
    onPageChange(1);
  };

  const count = Math.ceil(total / limit);

  return (
    <Box
      sx={{
        p: 1.5,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1.5,
        alignItems: 'center',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='subtitle2' sx={{ display: { xs: 'none', sm: 'revert' } }}>
            {t('page_size')}
          </Typography>
          <FormControl sx={{ mx: 1.5 }}>
            <Select<number>
              size='small'
              variant='standard'
              value={limit}
              onChange={handlePageSizeChange}
              MenuProps={{
                MenuListProps: { dense: true },
              }}
              disableUnderline
              sx={{
                [`& .${selectClasses.select}`]: {
                  display: 'flex',
                  alignItems: 'center',
                  pb: 0,
                },
              }}
            >
              {rowsPerPageOptions.map((rowsPerPage) => (
                <MenuItem key={rowsPerPage} value={rowsPerPage}>
                  <Typography variant='subtitle2'>{rowsPerPage}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography variant='subtitle2'>
          {count === 0 ? 0 : (page - 1) * limit + 1}-{page * limit} {'/'} {total}
        </Typography>
      </Box>
      <Pagination
        shape='rounded'
        showFirstButton
        showLastButton
        size='medium'
        count={count}
        page={page}
        onChange={handleChange}
      />
    </Box>
  );
};

export default ProTablePagination;
