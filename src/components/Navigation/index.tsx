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
  { title: 'Item 1', children: [{ title: 'Subitem 1',  route: '/about' }, { title: 'Subitem 2' }] },
  { title: 'Item 2', route: '/item-2', children: [{ title: 'Subitem 21' }, { title: 'Subitem 22' }] },
  { title: 'Item 3', route: '/item-3', },
  { title: 'Item 4', route: '/item-4', },
];

export default function Navigation() {
  const [selectedItem, setSelectedItem] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleToggle = (item: NavigationItem) => {
    const currentIndex = openItems.indexOf(item.title);
    const newOpenItems = [...openItems];

    if (currentIndex === -1) {
      newOpenItems.push(item.title);
    } else {
      newOpenItems.splice(currentIndex, 1);
    }

    if (!item.children) {
      setSelectedItem(item.title);
    }

    setOpenItems(newOpenItems);
  };

  const renderNavigationItems = (items: NavigationItem[], depth = 0) => (
    <List>
      {items.map((item) => (
        <div key={item.title}>
          <ListItem disablePadding>
            <ListItemButton
              selected={item.title === selectedItem}
              onClick={() => handleToggle(item)}
            >
              <ListItemText primary={item.title} style={{ paddingLeft: depth * 20 }} />
              {item.children && (openItems.includes(item.title) ? <ExpandLess /> : <ExpandMore />)}
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
          backgroundColor: "grey.100",
        }}
      >
        <Typography>{selectedItem}</Typography>
      </Box>
    </Box>
  );
}
