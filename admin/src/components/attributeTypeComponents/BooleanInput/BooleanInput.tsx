import React, { ReactElement } from "react";
import { Box, GridItem, Checkbox } from "@strapi/design-system";
import { GeneralProps } from "../types";

const BooleanInput = ({
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
          onChange={onChangeCheck(attributeKey)}
          checked={checked}
          disabled={disabled}
        >
          {`${attributeKey} (Field type: Boolean)`}
        </Checkbox>
      </Box>
    </GridItem>
  );
};

export default BooleanInput;
