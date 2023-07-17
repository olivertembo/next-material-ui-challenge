'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemText, ListItemButton, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import * as styles from './styles';

type NavigationItem = {
  title: string;
  route?: string;
  children?: NavigationItem[];
};

const navigationItems: NavigationItem[] = [
  {
    title: "Item 1",
    children: [
      {
        title: "Subitem 1",
        route: "/about",
        children: [
          { title: "Subitem 1", route: "/about" },
          {
            title: "Subitem 2",
            children: [
              {
                title: "Subitem 1",
                route: "/about",
                children: [
                  { title: "Subitem 1", route: "/about" },
                  {
                    title: "Subitem 2",
                    children: [
                      {
                        title: "Subitem 1",
                        route: "/about",
                        children: [
                          { title: "Subitem 1", route: "/about" },
                          { title: "Subitem 2" },
                        ],
                      },
                      { title: "Subitem 2" },
                    ],
                  },
                ],
              },
              { title: "Subitem 2" },
            ],
          },
        ],
      },
      { title: "Subitem 2" },
    ],
  },
  {
    title: "Item 2",
    route: "/item-2",
    children: [{ title: "Subitem 21" }, { title: "Subitem 22" }],
  },
  { title: "Item 3", route: "/item-3" },
  { title: "Item 4", route: "/item-4" },
];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(localStorage.getItem("selectedItem") || '');
  const [openItems, setOpenItems] = useState<string[]>(localStorage.getItem("openItems")?.split(',') || []);

  const handleToggle = (key: string) => {
    const currentIndex = openItems.indexOf(key);
    const newOpenItems = [...openItems];

    if (currentIndex === -1) {
      newOpenItems.push(key);
    } else {
      newOpenItems.splice(currentIndex, 1);
    }
    setSelectedItem(key);
    setOpenItems(newOpenItems);
  };

  useEffect(() => {
    localStorage.setItem("selectedItem", selectedItem);
    localStorage.setItem("openItems", openItems.join(','));
  }, [selectedItem, openItems]);

  const renderNavigationItems = (items: NavigationItem[], depth = 0) => (
    <List>
      {items.map((item, index) => (
        <div key={`${item.title}-${index}-${depth}`}>
          <ListItem disablePadding>
            <ListItemButton
              selected={item.title === selectedItem}
              onClick={() => handleToggle(`${item.title}-${index}-${depth}`)}
            >
              <ListItemText primary={item.title} style={{ paddingLeft: depth * 20 }} />
              {item.children ? (openItems.includes(`${item.title}-${index}-${depth}`) ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
          </ListItem>
          <Collapse in={openItems.includes(`${item.title}-${index}-${depth}`)} timeout="auto" unmountOnExit>
            {item.children && renderNavigationItems(item.children, depth + 1)}
          </Collapse>
        </div>
      ))}
    </List>
  );

  return (
    <Box sx={styles.container}>
      <Drawer variant="permanent" open>
        {renderNavigationItems(navigationItems)}
      </Drawer>
      <Box
        component="main"
        sx={styles.main}
      >
        <Typography>{selectedItem}</Typography>
      </Box>
    </Box>
  );
}
