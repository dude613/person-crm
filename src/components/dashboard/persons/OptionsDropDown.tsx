import {
  Menu,
  Pencil
} from "lucide-react";

import { Button } from "src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "src/components/ui/dropdown-menu";

export function OptionsDropDown() {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu className="mr-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            {/* <Trash2 className="mr-2 h-4 w-4 text-destructive" />
            <span>Delete</span>
           */}
            {/* <DeleteDialog/> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
