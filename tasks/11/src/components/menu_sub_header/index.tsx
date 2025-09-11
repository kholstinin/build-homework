import { PropsWithChildren } from 'react';
import { ListSubheader } from '@mui/material';

const MenuSubHeader = ({ children }: PropsWithChildren) => {
  return (
    <ListSubheader
      className="body-small-semibold"
      sx={{
        font: 'inherit',
        padding: '16px 16px 8px 16px',
        userSelect: 'none',
        backgroundColor: 'var(--white)',
        '&.MuiListSubheader-root': {
          color: 'var(--accent-dark)',
        },
      }}
    >
      {children}
    </ListSubheader>
  );
};

export default MenuSubHeader;
