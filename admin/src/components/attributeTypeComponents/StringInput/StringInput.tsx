import React from "react";
import { Box } from "@strapi/design-system/Box";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import { NumberInput } from "@strapi/design-system/NumberInput";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { GeneralProps } from "../types";
import { AttributeType } from "../../../pages/HomePage/types";

interface Props extends GeneralProps {
  values: { count: number };
  onChangeValue: (key: string, field: string) => void;
}

const StringInput = ({
  attribute,
  attributeKey,
  checked,
  values,
  onChangeCheck,
  onChangeValue,
}: Props) => {
  return (
    <GridItem col={6}>
      <Box marginBottom="8px">
        <Box marginBottom="12px">
          <Checkbox
            disabled={attribute.required}
            onChange={onChangeCheck(attributeKey)}
            checked={checked}
          >
            {attributeKey} (Field type:{" "}
            {attribute.type === AttributeType.String ? "String" : "Richtext"})
          </Checkbox>
        </Box>
        <NumberInput
          disabled={!checked}
          onValueChange={onChangeValue(attributeKey, "count")}
          // @ts-ignore
          value={values.count}
          label="Count words"
        ></NumberInput>
      </Box>
    </GridItem>
  );
};

export default StringInput;
