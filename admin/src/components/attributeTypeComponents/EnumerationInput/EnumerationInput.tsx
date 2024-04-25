import React, { ReactElement } from "react";
import { Box, GridItem, Checkbox } from "@strapi/design-system";
import { GeneralProps } from "../types";

const EnumerationInput = ({
  attribute,
  attributeKey,
  checked,
  disabled,
  onChangeCheck,
}: GeneralProps): ReactElement => (
  <GridItem col={6}>
    <Box marginBottom="8px">
      <Checkbox
        disabled={disabled}
        onChange={() => onChangeCheck(attributeKey)}
        checked={checked}
      >
        {`${attributeKey} (field type: Enumeration)`}
      </Checkbox>
    </Box>
  </GridItem>
);

export default EnumerationInput;
