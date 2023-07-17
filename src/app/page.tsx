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
  const [selectedItem, setSelectedItem] = useState(localStorage?.getItem("selectedItem") || '');
  const [openItems, setOpenItems] = useState<string[]>(localStorage?.getItem("openItems")?.split(',') || []);

  const handleToggle = (key: string, depth: number) => {
    const [title, index, keyDepth] = key.split("-");
    if (Number(keyDepth) === depth) {
      let newOpenItems = openItems.filter(item => {
        const [, , itemDepth] = item.split("-");
        return Number(itemDepth) !== depth;
      });
  
      if (!openItems.includes(key)) {
        newOpenItems.push(key);
      }
  
      setSelectedItem(title);
      setOpenItems(newOpenItems);
    }
  };
  

  useEffect(() => {
    localStorage.setItem("selectedItem", selectedItem);
    localStorage.setItem("openItems", openItems.join(','));
  }, [selectedItem, openItems]);

  const renderNavigationItems = (items: NavigationItem[], depth = 0) => (
    <List>
      {items.map((item, index) => {
        const key = `${item.title}-${index}-${depth}`;
        return (
        <div key={`${item.title}-${index}-${depth}`}>
          <ListItem disablePadding>
            <ListItemButton
              selected={`${item.title}-${index}-${depth}` === selectedItem}
              onClick={() => handleToggle(key, depth)}
            >
              <ListItemText primary={item.title} style={{ paddingLeft: depth * 20 }} />
              {item.children ? (openItems.includes(`${item.title}-${index}-${depth}`) ? <ExpandLess /> : <ExpandMore />) : null}
            </ListItemButton>
          </ListItem>
          <Collapse in={openItems.includes(`${item.title}-${index}-${depth}`)} timeout="auto" unmountOnExit>
            {item.children && renderNavigationItems(item.children, depth + 1)}
          </Collapse>
        </div>
      )})}
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
