import React, { useState, useEffect, useMemo } from "react";
import { Select, Option } from "@strapi/design-system/Select";
import {
  HeaderLayout,
  ContentLayout,
  Layout,
} from "@strapi/design-system/Layout";
import { Box } from "@strapi/design-system/Box";
import { Grid } from "@strapi/design-system/Grid";
import { Flex } from "@strapi/design-system/Flex";
import { NumberInput } from "@strapi/design-system/NumberInput";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { Alert } from "@strapi/design-system/Alert";
import GeneratedDataTable from "../../components/GeneratedDataTable";
import Upload from "../../components/Upload";
import Generate from "../../components/Generate";
import axios from "../../utils/axiosInstance";
import { getAttributeInputs } from "./config";
import { AttributeType, Values } from "./types";

interface ContentType {
  apiID: string;
  uid: string;
  schema: {
    attributes: { [key: string]: { type: AttributeType } };
    draftAndPublish: boolean;
  };
}

const includeTypes = Object.values(AttributeType);

const COUNT_RELATION_DATA_PER_PAGE = 25;

const HomePage: React.FC = () => {
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [isUploadingData, setIsUploadingData] = useState<boolean>(false);
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [uploadedError, setUploadedError] = useState<boolean>(false);
  const [selectedTypeUID, setSelectedTypeUID] = useState<string | null>(null);
  const [values, setValues] = useState<Values>(null);
  const [count, setCount] = useState<number>(10);
  const [checkedAttributes, setCheckedAttributes] = useState<string[]>([]);
  const [generatedData, setGeneratedData] = useState<{ [key: string]: any }[]>(
    []
  );
  const [isFlushedPreviousData, setIsFlashedPreviousData] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.get("/content-type-builder/content-types");
      setContentTypes(data.filter((item) => item.uid.startsWith("api")));
    })();
  }, []);

  const selectedType = contentTypes.find(
    (item) => item.uid === selectedTypeUID
  ) as unknown as ContentType;

  let draftAndPublish = selectedType?.schema.draftAndPublish || false;

  const attributes = useMemo(
    () =>
      selectedType
        ? Object.keys(selectedType.schema.attributes).reduce((prev, key) => {
            return includeTypes.includes(
              selectedType.schema.attributes[key].type
            )
              ? {
                  ...prev,
                  [key]: selectedType.schema.attributes[key],
                }
              : prev;
          }, {})
        : null,
    [selectedType]
  );

  useEffect(() => {
    if (attributes && !values) {
      let obj = {};
      let newCheckedAttributes: string[] = [];
      const createValues = async () => {
        await Promise.all(
          Object.keys(attributes).map(async (key) => {
            let type = attributes[key].type;
            if ([AttributeType.Integer, AttributeType.Decimal].includes(type)) {
              obj[key] = {
                min: attributes[key].min || 0,
                max: attributes[key].max || 10,
              };
            }
            if ([AttributeType.String, AttributeType.Richtext].includes(type)) {
              obj[key] = { count: 10 };
            }
            if (type === AttributeType.Date) {
              obj[key] = { from: new Date(), to: new Date() };
            }
            if (attributes[key].type === AttributeType.Media) {
              obj[key] = {
                width: 640,
                height: 480,
                ...(attributes[key].multiple ? { min: 1, max: 3 } : {}),
              };
            }
            if (type === AttributeType.Relation) {
              const {
                data: { pagination },
              } = await axios(
                `/content-manager/collection-types/${attributes[key].target}?pageSize=1`
              );
              let pageCount = Math.ceil(
                pagination.total / COUNT_RELATION_DATA_PER_PAGE
              );
              obj[key] = {
                pageCount,
              };
              if (pageCount === 0) {
                return;
              }
            }
            if (
              [
                AttributeType.Email,
                AttributeType.Boolean,
                AttributeType.Enumeration,
                AttributeType.UID,
                AttributeType.Password,
              ].includes(type)
            ) {
              obj[key] = {};
            }
            newCheckedAttributes.push(key);
          })
        );
        setCheckedAttributes(newCheckedAttributes);
        setValues(obj);
      };
      createValues();
    }
  }, [attributes, values]);

  const handleChangeSelect = (newTypeUID: string) => {
    setValues(null);
    setSelectedTypeUID(newTypeUID);
    setGeneratedData([]);
    setShowAlert(false);
  };

  const handleChangeValue =
    (key: string, field: string) => (value: number | Date) => {
      const { min, max } = attributes[key];
      if (min || max) {
        let { min: currentMin, max: currentMax } = values[key] as {
          min: number;
          max: number;
        };
        if (
          value < min ||
          value > max ||
          (field === "min" && value > currentMax) ||
          (field === "max" && value < currentMin)
        ) {
          return;
        }
      }
      if (field === "from" || field === "to") {
        let { from, to } = values[key] as {
          from: Date;
          to: Date;
        };

        if (
          (field === "from" && value > to) ||
          (field === "to" && value < from)
        ) {
          return;
        }
      }
      if (value > 0) {
        // @ts-ignore
        setValues({
          ...values,
          [key]: { ...values[key], [field]: value },
        });
      }
    };

  const handleChangeCheck = (key: string) => () => {
    if (checkedAttributes.includes(key)) {
      setCheckedAttributes(checkedAttributes.filter((item) => item !== key));
    } else {
      setCheckedAttributes([...checkedAttributes, key]);
    }
  };

  const handleChangeIsFlushedPreviousData = () => {
    setIsFlashedPreviousData(!isFlushedPreviousData);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleChangeIsPublished = () => {
    setIsPublished(!isPublished);
  };

  return (
    <Layout>
      <HeaderLayout
        title="Generate data"
        subtitle="Generate data for your content types"
        as="h1"
        primaryAction={
          selectedType && (
            <Generate
              attributes={attributes}
              checkedAttributes={checkedAttributes}
              count={count}
              onChangeGenerateData={setGeneratedData}
              values={values}
            ></Generate>
          )
        }
      />
      <ContentLayout>
        <Box
          shadow="filterShadow"
          padding="24px 32px"
          borderRadius="4px"
          marginBottom="24px"
          background="neutral0"
        >
          <Flex gap="16px">
            <Box flex="1" marginBottom="24px">
              <Select
                label="Content type"
                placeholder="Select your content type"
                value={selectedTypeUID}
                onChange={handleChangeSelect}
              >
                {contentTypes.map((item) => (
                  <Option key={item.uid} value={item.uid}>
                    {item.apiID}
                  </Option>
                ))}
              </Select>
            </Box>
            <Box flex="1"></Box>
          </Flex>
          <Grid gap="16px">
            {attributes &&
              values &&
              Object.keys(attributes).map(
                (key) =>
                  getAttributeInputs({
                    key,
                    attribute: attributes[key],
                    values,
                    checkedAttributes,
                    onChangeCheck: handleChangeCheck,
                    onChangeValue: handleChangeValue,
                  })[attributes[key].type]
              )}
          </Grid>
          {attributes && (
            <Flex gap="16px">
              <Box paddingTop="16px" flex="1">
                <NumberInput
                  value={count}
                  onValueChange={setCount}
                  label="Count items to generate"
                ></NumberInput>
              </Box>{" "}
              <Box flex="1"></Box>
            </Flex>
          )}
        </Box>
        {!!generatedData.length && (
          <>
            <GeneratedDataTable
              attributes={attributes}
              data={generatedData}
            ></GeneratedDataTable>
            <Flex
              alignItems="center"
              marginTop="12px"
              marginBottom="12px"
              gap="32px"
            >
              <Checkbox
                disabled={isUploadingData}
                checked={isFlushedPreviousData}
                onChange={handleChangeIsFlushedPreviousData}
              >
                Flush previous content type data before upload
              </Checkbox>
              {draftAndPublish && (
                <Checkbox
                  onChange={handleChangeIsPublished}
                  checked={isPublished}
                >
                  Publish content?
                </Checkbox>
              )}
              <Upload
                attributes={attributes}
                selectedType={selectedType}
                generatedData={generatedData}
                isFlushedPreviousData={isFlushedPreviousData}
                isPublished={isPublished}
                isUploadingData={isUploadingData}
                onChangeUploadedError={setUploadedError}
                onChangeIsUploadingData={setIsUploadingData}
                onChangeShowAlert={setShowAlert}
              ></Upload>
            </Flex>
          </>
        )}
        {showAlert && selectedType && (
          <Alert
            variant={uploadedError ? "danger" : "success"}
            onClose={handleCloseAlert}
            closeLabel="Close alert"
            title="Uploaded Alert"
          >
            The data for <b>{selectedType.apiID}</b> was
            {uploadedError && "'t"} uploaded
          </Alert>
        )}
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
