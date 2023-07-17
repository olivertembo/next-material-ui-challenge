'use client';

import { useState } from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemText, ListItemButton, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

type NavigationItem = {
  title: string;
  route?: string;
  children?: NavigationItem[];
};

const navigationItems: NavigationItem[] = [
  { title: 'Item 1', route: '/about', children: [{ title: 'Subitem 1' }, { title: 'Subitem 2' }] },
  { title: 'Item 2' },
  { title: 'Item 3', route: '/item-3', },
  { title: 'Item 4', route: '/item-4', },
];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleToggle = (item: string) => {
    const currentIndex = openItems.indexOf(item);
    const newOpenItems = [...openItems];

    if (currentIndex === -1) {
      newOpenItems.push(item);
    } else {
      newOpenItems.splice(currentIndex, 1);
    }

    setSelectedItem(item);

    setOpenItems(newOpenItems);
  };

  const renderNavigationItems = (items: NavigationItem[], depth = 0) => (
    <List>
      {items.map((item) => (
        <div key={item.title}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleToggle(item.title)}>
              <ListItemText primary={item.title} style={{ paddingLeft: depth * 20 }} />
              {openItems.includes(item.title) ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openItems.includes(item.title)} timeout="auto" unmountOnExit>
            {item.children && renderNavigationItems(item.children, depth + 1)}
          </Collapse>
        </div>
      ))}
    </List>
  );

  return (
      <Box sx={{ display: "flex" }}>
        <Drawer variant="permanent" open>
          {renderNavigationItems(navigationItems)}
        </Drawer>
        <Box
          component="main"
          sx={{
            p: 3,
            width: "100%",
            marginLeft: "184px",
          }}
        >
          <Typography>{selectedItem}</Typography>
        </Box>
      </Box>
  );
}
