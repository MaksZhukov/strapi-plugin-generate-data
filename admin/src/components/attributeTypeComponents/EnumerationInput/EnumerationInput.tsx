import React, { ReactElement } from "react";
import { Box } from "@strapi/design-system/Box";
import { GridItem } from "@strapi/design-system/Grid";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { GeneralProps } from "../types";

const EnumerationInput = ({
  attribute,
  attributeKey,
  checked,
  onChangeCheck,
}: GeneralProps): ReactElement => (
  <GridItem col={6}>
    <Box marginBottom="8px">
      <Checkbox
        disabled={attribute.required}
        onChange={onChangeCheck(attributeKey)}
        checked={checked}
      >
        {attributeKey}
      </Checkbox>
    </Box>
  </GridItem>
);

export default EnumerationInput;
