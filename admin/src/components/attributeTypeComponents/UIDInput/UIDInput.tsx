import React, { ReactElement } from "react";
import { Box } from "@strapi/design-system/Box";
import { GridItem } from "@strapi/design-system/Grid";
import { Typography } from "@strapi/design-system/Typography";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { GeneralProps } from "../types";

const UIDInput = ({
  attribute,
  attributeKey,
  checked,
  disabled,
  onChangeCheck,
}: GeneralProps): ReactElement => {
  return (
    <GridItem col={6}>
      <Box marginBottom="8px">
        <Checkbox
          disabled={disabled}
          onChange={onChangeCheck(attributeKey)}
          checked={checked}
        >
          {attribute.targetField ? (
            <>
              {`${attributeKey} (Field type: UID); `}
              {"Target field: "}
              <Typography fontWeight="bold">{attribute.targetField}</Typography>
            </>
          ) : (
            `${attributeKey} (Field type: UID)`
          )}
        </Checkbox>
      </Box>
    </GridItem>
  );
};

export default UIDInput;
