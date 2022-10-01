import React, { ReactElement } from "react";
import { Box } from "@strapi/design-system/Box";
import { GridItem } from "@strapi/design-system/Grid";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { Typography } from "@strapi/design-system/Typography";
import { GeneralProps } from "../types";

interface Props extends GeneralProps {
  values: { pageCount: number };
}

const RelationInput = ({
  attribute,
  attributeKey,
  checked,
  disabled,
  values,
  onChangeCheck,
}: Props): ReactElement => {
  return (
    <GridItem col={6}>
      <Box marginBottom="8px">
        <Checkbox
          disabled={disabled || values.pageCount === 0}
          onChange={onChangeCheck(attributeKey)}
          checked={checked}
        >
          {`${attributeKey} (Field type: Relation) 
          ${
            values.pageCount === 0 ? (
              <Typography textColor="warning500" variant="warning">
                Generate or add data for the type
              </Typography>
            ) : (
              ""
            )
          }`}
        </Checkbox>
      </Box>
    </GridItem>
  );
};

export default RelationInput;
