import React, { FC } from 'react';
import Link from 'next/link';
import { Menu } from '@mui/material';
import { popoverClasses } from '@mui/material/Popover';
import styles from './horizontalMenu.module.scss';
import { HorizontalMenuProps } from './horizontalMenu.types';
const HorizontalMenu: FC<HorizontalMenuProps> = ({ menuItem }) => {
  let currentlyHovering = false;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  function handleClick(event: any) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleHover() {
    currentlyHovering = true;
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function handleCloseHover() {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 50);
  }
  const open = Boolean(anchorEl);
  return (
    <div>
      <div
        className={styles.menu_button}
        aria-controls={open ? 'simple-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        onMouseOver={handleClick}
        onMouseLeave={handleCloseHover}
      >
        {menuItem?.category_name}
      </div>
      {menuItem?.subcategories && menuItem?.subcategories?.length > 0 && (
        <Menu
          id="simple-menu"
          aria-labelledby="simple-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            onMouseEnter: handleHover,
            onMouseLeave: handleCloseHover,
            style: {
              pointerEvents: 'auto',
              backgroundColor: '#000',
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{
            [`&.${popoverClasses.root}`]: {
              pointerEvents: 'none',
            },
          }}
          disableRestoreFocus
        >
          {menuItem?.subcategories.map((subMenuItem, i) => (
            <div
              className={styles.sub_menu_item}
              key={`submenu-itemh-${i}`}
              onClick={handleCloseHover}
            >
              <Link
                href={`/subcategory/${subMenuItem?.subcategory_id}`}
                className={styles.sub_menu_link}
              >
                {subMenuItem?.subcategory_name}
              </Link>
            </div>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default HorizontalMenu;
