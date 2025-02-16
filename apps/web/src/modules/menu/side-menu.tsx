import { Box, Collapse, IconButton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { updateMenu } from './menu-slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { MenuType, PageMapState } from '../../types';
import { useNavigate } from 'react-router-dom';
import { updatePagemap } from '../pagemap/map-slice';
import { useCallback } from 'react';

export const SideMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector((state) => state.menuReducer);

  const handleMenuClick = useCallback(
    (menuIndex: number, subMenuIndex?: number) => {
      const newMenu: MenuType[] = menu.map((menuItem, mIndex) => {
        const newIsOpen =
          menuIndex === mIndex && subMenuIndex === undefined
            ? !menuItem.isOpen
            : menuIndex === mIndex;

        const newSubMenu = menuItem.subMenu.map((subMenuItem, sIndex) => ({
          ...subMenuItem,
          isSelected: sIndex === subMenuIndex,
        }));

        return { ...menuItem, isOpen: newIsOpen, subMenu: newSubMenu };
      });

      dispatch(updateMenu(newMenu));

      if (subMenuIndex !== undefined) {
        const { path, pageTitle } = menu[menuIndex].subMenu[subMenuIndex];
        const map: PageMapState = {
          pageTitle,
          referencePath: path,
          referencePageTitle: '',
        };
        dispatch(updatePagemap(map));
        navigate(path);
      }
    },
    [dispatch, menu, navigate],
  );

  return (
    <Box px={2} py={4}>
      {menu.map((item, index) => (
        <Box key={`menuItem-${index}`} mb={3}>
          <Box
            display="grid"
            gridTemplateColumns="30px 1fr 30px"
            alignItems="center"
          >
            <FontAwesomeIcon icon={item.icon} />
            <Typography
              onClick={() => handleMenuClick(index)}
              sx={{ cursor: 'pointer' }}
            >
              {item.title}
            </Typography>
            <IconButton onClick={() => handleMenuClick(index)} sx={{ p: 0 }}>
              {item.isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          {item.subMenu.length > 0 && (
            <Collapse in={item.isOpen}>
              <Box pt={2}>
                {item.subMenu.map((subMenu, i) => (
                  <Typography
                    key={`submenu-${i}`}
                    ml={4}
                    pb={1}
                    variant="body1"
                    onClick={() => handleMenuClick(index, i)}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: subMenu.isSelected ? 'bold' : 'normal',
                      textTransform: 'capitalize',
                    }}
                  >
                    {subMenu.title}
                  </Typography>
                ))}
              </Box>
            </Collapse>
          )}
        </Box>
      ))}
    </Box>
  );
};
