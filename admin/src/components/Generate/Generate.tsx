//@ts-nocheck
import React from "react";
import RefreshIcon from "@strapi/icons/Refresh";
import { Button } from "@strapi/design-system/Button";
import { AttributeType, Values } from "../../pages/HomePage/types";
import { faker } from "@faker-js/faker";
import axios from "../../utils/axiosInstance";
import qs from "qs";
import slugify from "slugify";

interface Props {
  attributes: any;
  checkedAttributes: string[];
  values: Values;
  count: number;
  onChangeGenerateData: (data: any[]) => void;
}

const Generate = ({
  attributes,
  checkedAttributes,
  values,
  count,
  onChangeGenerateData,
}: Props) => {
  const getValueByIntegerType = (key: string): number => {
    let { min, max } = values[key] as {
      min: number;
      max: number;
    };
    return faker.datatype.number({ min, max });
  };

  const getValueByDecimalType = (key: string): number => {
    let { min, max } = values[key] as {
      min: number;
      max: number;
    };
    return faker.datatype.float({ min, max });
  };

  const getValueByStringAndRichtextType = (key: string): string => {
    let { count } = values[key] as { count: number };
    return faker.random.words(count);
  };
  const getValueByEmailType = (): string => {
    return faker.internet.email();
  };
  const getValueByDateType = (key: string): Date => {
    let { from, to } = values[key] as {
      from: Date;
      to: Date;
    };
    return faker.date.between(from, to);
  };

  const getValueByMediaType = (key: string): string[] => {
    let value = [];
    let { width, height, min, max } = values[key] as {
      width: number;
      height: number;
      min: number;
      max: number;
    };
    if (min && max) {
      value.push(
        ...new Array(faker.datatype.number({ min, max }))
          .fill(null)
          .map(() => faker.image.image(width, height, true))
      );
    } else {
      value.push(faker.image.image(width, height, true));
    }
    return value;
  };

  const getValueByBooleanType = (): boolean => {
    return faker.datatype.boolean();
  };

  const getValueByEnumerationType = (key: string): string => {
    const enumValues = attributes[key].enum;
    let randomIndex = faker.datatype.number({
      min: 0,
      max: enumValues.length - 1,
    });
    return enumValues[randomIndex];
  };

  const getValueByPasswordType = (): string => {
    return faker.internet.password();
  };

  const getValueByUIDType = (): string => {
    return faker.unique(faker.datatype.number).toString();
  };

  const getValueByRelationType = (
    key: string,
    relationArray: number[]
  ): number => {
    return relationArray[
      faker.datatype.number({ min: 0, max: relationArray.length - 1 })
    ];
  };

  const getGeneratedDataByType = (
    type: AttributeType,
    key: string,
    relationArray: { [key: string]: number[] }
  ): any => {
    let obj = {
      [AttributeType.Integer]: getValueByIntegerType,
      [AttributeType.String]: getValueByStringAndRichtextType,
      [AttributeType.Richtext]: getValueByStringAndRichtextType,
      [AttributeType.Email]: getValueByEmailType,
      [AttributeType.Date]: getValueByDateType,
      [AttributeType.Media]: getValueByMediaType,
      [AttributeType.Boolean]: getValueByBooleanType,
      [AttributeType.Enumeration]: getValueByEnumerationType,
      [AttributeType.Password]: getValueByPasswordType,
      [AttributeType.UID]: getValueByUIDType,
      [AttributeType.Decimal]: getValueByDecimalType,
      [AttributeType.Relation]: getValueByRelationType,
    };
    return obj[type](key, relationArray[key]);
  };
  const handleClickGenerate = async () => {
    let data = [];
    if (attributes && values) {
      let relationData = {};
      const relationKeys = Object.keys(attributes)
        .filter((key) => checkedAttributes.includes(key))
        .filter((key) => attributes[key].type === AttributeType.Relation);

      await Promise.all(
        relationKeys.map(async (key) => {
          const res = await axios(
            `/content-manager/collection-types/${
              attributes[key].target
            }?${qs.stringify(
              {
                fields: ["id"],
                page: faker.datatype.number({
                  min: 1,
                  max: 1,
                }),
              },
              { encodeValuesOnly: true }
            )}`
          );
          relationData[key] = res.data.results.map((item) => item.id);
        })
      );

      for (let i = 0; i < count; i++) {
        let obj = {};
        let UIDsWithTargetField = [];
        Object.keys(attributes)
          .filter((key) => checkedAttributes.includes(key))
          .forEach((key) => {
            if (
              attributes[key].type === AttributeType.UID &&
              attributes[key].targetField
            ) {
              UIDsWithTargetField.push([key, attributes[key]]);
            }
            obj[key] = getGeneratedDataByType(
              attributes[key].type,
              key,
              relationData
            );
          });
        console.log(UIDsWithTargetField);
        UIDsWithTargetField.forEach(([key, attr]) => {
          obj[key] = slugify(obj[attr.targetField], "-") + "-" + obj[key];
        });
        data.push(obj);
      }
    }
    onChangeGenerateData(data);
  };
  return (
    <Button
      startIcon={<RefreshIcon></RefreshIcon>}
      onClick={handleClickGenerate}
    >
      Generate
    </Button>
  );
};

export default Generate;
