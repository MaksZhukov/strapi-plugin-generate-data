import React, { ReactElement } from "react";
import { Box, GridItem, Checkbox } from "@strapi/design-system";
import { GeneralProps } from "../types";

const Email = ({
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
        onChange={onChangeCheck(attributeKey)}
        checked={checked}
      >
        {`${attributeKey} (Field type: Email)`}
      </Checkbox>
    </Box>
  </GridItem>
);

export default Email;
