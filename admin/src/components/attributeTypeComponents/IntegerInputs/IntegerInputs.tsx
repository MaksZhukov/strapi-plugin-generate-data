import React from "react";
import { Box, GridItem, Flex, Checkbox, NumberInput } from "@strapi/design-system";
import { GeneralProps } from "../types";

interface Props extends GeneralProps {
  values: { min: number; max: number };
  onChangeValue: (key: string, field: string) => void;
}

const IntegerInputs = ({
  onChangeCheck,
  attribute,
  attributeKey,
  checked,
  disabled,
  values,
  onChangeValue,
}: Props) => {
  return (
    <GridItem col={12}>
      <Box marginBottom="8px">
        <Box marginBottom="12px">
          <Checkbox
            disabled={disabled}
            onChange={onChangeCheck(attributeKey)}
            checked={checked}
          >
            {`${attributeKey} (Field type: Integer)`}
          </Checkbox>
        </Box>
        <Flex gap="16px">
          <Box flex="1">
            <NumberInput
              name=""
              disabled={!checked}
              onValueChange={onChangeValue(attributeKey, "min")}
              // @ts-ignore
              value={values.min}
              label={`min ${attribute.min ? attribute.min : ""}`}
            ></NumberInput>
          </Box>
          <Box flex="1">
            <NumberInput
              name=""
              disabled={!checked}
              onValueChange={onChangeValue(attributeKey, "max")}
              // @ts-ignore
              value={values.max}
              label={`max ${attribute.max ? attribute.max : ""}`}
            ></NumberInput>
          </Box>
        </Flex>
      </Box>
    </GridItem>
  );
};

export default IntegerInputs;
