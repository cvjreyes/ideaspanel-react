/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
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
          css={contentDropdownStyle}
        >
          <DropdownMenu.Item asChild>
            <Button
              onClick={() => {
                setOrderByDateOld(false);
                setOrderByMoreLikes(false);
              }}
              className="button_style border_radius_top"
            >
              New Card
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Button
              onClick={() => {
                setOrderByDateOld(!orderByDateOld);
              }}
              className="button_style no_border_radius"
            >
              Old Card
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Button
              onClick={() => {
                setOrderByMoreLikes(!orderByMoreLikes);
              }}
              className="button_style border_radius_bottom"
            >
              Likes
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const contentDropdownStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f2f2f2",
  borderRadius: "10px",
  ".button_style": {
    width: "200px",
    height: "auto",
    color: "#7E7E7E",
    background: "transparent",
    fontSize: "15px",
    ":hover": {
      outline: "none",
      backgroundColor: "lightgray",
      color: "black",
      fontWeight: "bold",
    },
  },
  ".border_radius_top": {
    borderRadius: "10px 10px 0 0",
  },
  ".border_radius_bottom": {
    borderRadius: "0 0 10px 10px",
  },
  ".no_border_radius": {
    borderRadius: "0",
  },
};

export { OrderByDropdown };
