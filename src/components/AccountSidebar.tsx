import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ShoppingBag } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type AccountSidebarProps = {
  selected: string;
  onSelect: Dispatch<SetStateAction<string>>;
};

export default function AccountSidebar({
  selected,
  onSelect,
}: AccountSidebarProps) {
  const menus = [
    { key: "orders", label: "My orders", icon: <ShoppingBag size={20} /> },
  ];

  return (
    <Box
      sx={{
        width: 240,
        mt: 1,
        bgcolor: "transparent",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        {menus.map((menu) => {
          const isSelected = selected === menu.key;
          return (
            <ListItemButton
              key={menu.key}
              selected={isSelected}
              onClick={() => onSelect(menu.key)}
              sx={{
                bgcolor: "transparent",
                transition: "all 0.16s ease-in-out",
                boxShadow: "none",
                mb: 1,
                "& .MuiListItemText-root": {
                  color: isSelected ? "#0b341b" : "#000",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  transition: "color 0.16s ease-in-out",
                  "& svg": {
                    color: isSelected ? "#0b341b" : "#000",
                  },
                }}
              >
                {menu.icon}
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
