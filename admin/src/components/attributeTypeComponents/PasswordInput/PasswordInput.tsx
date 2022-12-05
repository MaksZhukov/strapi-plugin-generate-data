import React, { ReactElement } from "react";
import { Box, GridItem, Checkbox } from "@strapi/design-system";
import { GeneralProps } from "../types";

const PasswordInput = ({
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
          {`${attributeKey} (Field type: Password)`}
        </Checkbox>
      </Box>
    </GridItem>
  );
};

export default PasswordInput;
