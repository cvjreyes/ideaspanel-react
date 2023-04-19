import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BiFilterAlt } from "react-icons/bi";

import { Button } from "../general";

function OrderByDropdown({
  orderByDateOld,
  setOrderByDateOld,
  orderByMoreLikes,
  setOrderByMoreLikes,
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button>
          Order by <BiFilterAlt />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          align="end"
          style={{
            position: "relative",
            backgroundColor: "transparent",
            padding: "0.2rem",
            width: "190px",
            left: "200px",
            top:"-56px"
          }}
        >
          <DropdownMenu.Item asChild>
            <Button
              onClick={() => {
                setOrderByDateOld(false);
                setOrderByMoreLikes(false);
              }}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            >
              New Card
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Button
              onClick={() => {
                setOrderByDateOld(!orderByDateOld);
              }}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            >
              Old Card
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Button
              onClick={() => {
                setOrderByMoreLikes(!orderByMoreLikes);
              }}
              style={{ width: "100%", marginBottom: "0.5rem" }}
            >
              Likes
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export { OrderByDropdown };
