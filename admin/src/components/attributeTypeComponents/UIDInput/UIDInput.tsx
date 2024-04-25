import React, { ReactElement } from "react";
import { Box, GridItem, Typography, Checkbox } from "@strapi/design-system";
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
          onChange={() => onChangeCheck(attributeKey)}
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
