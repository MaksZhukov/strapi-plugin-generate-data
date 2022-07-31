import React from "react";
import { Button } from "@strapi/design-system/Button";
import axios from "../../utils/axiosInstance";

const COUNT_UPLOADED_DATA_ONCE = 25;

interface Props {
  isUploadingData: boolean;
  attributes: any;
  selectedType: any;
  isFlushedPreviousData: boolean;
  isPublished: boolean;
  generatedData: { [key: string]: any }[];
  onChangeIsUploadingData: (value: boolean) => void;
  onChangeShowAlert: (value: boolean) => void;
}

const Upload = ({
  isUploadingData,
  attributes,
  isFlushedPreviousData,
  selectedType,
  isPublished,
  generatedData,
  onChangeIsUploadingData,
  onChangeShowAlert,
}: Props) => {
  const handleUploadData = async () => {
    onChangeIsUploadingData(true);
    onChangeShowAlert(false);
    const mediaKeys = Object.keys(attributes).filter(
      (key) => attributes[key].type === "media"
    );

    if (selectedType) {
      try {
        if (isFlushedPreviousData) {
          await axios.post(`/generate-data/flush/${selectedType.uid}`);
        }
        let uploadData = async (data) => {
          if (!data.length) {
            return;
          }
          let dataByCount = data.slice(0, COUNT_UPLOADED_DATA_ONCE);
          let uploadedMediaData = {};
          if (mediaKeys.length) {
            const mediaData = mediaKeys.reduce((prev, key) => {
              return {
                ...prev,
                [key]: dataByCount.map((item) => item[key]),
              };
            }, {});
            const response = await axios.post(
              "/generate-data/upload",
              mediaData
            );
            uploadedMediaData = response.data;
          }

          const transformedData = Object.keys(uploadedMediaData).length
            ? dataByCount.map((item, index) => {
                Object.keys(uploadedMediaData).forEach((key) => {
                  item[key] =
                    uploadedMediaData[key][index].map(
                      (uploadedItem) => uploadedItem.id
                    ) || item[key];
                });
                return item;
              })
            : dataByCount;

          const response = await Promise.all(
            transformedData.map((item) =>
              axios.post(
                `/content-manager/collection-types/${selectedType.uid}`,
                item
              )
            )
          );

          if (isPublished) {
            await Promise.all(
              response.map((item) =>
                axios.post(
                  `/content-manager/collection-types/${selectedType.uid}/${item.data.id}/actions/publish`
                )
              )
            );
          }
          return uploadData(data.slice(COUNT_UPLOADED_DATA_ONCE));
        };
        await uploadData(generatedData);
      } catch (err) {}
    }
    onChangeIsUploadingData(false);
    onChangeShowAlert(true);
  };
  return (
    <Button
      variant="secondary"
      loading={isUploadingData}
      onClick={handleUploadData}
    >
      Upload data
    </Button>
  );
};

export default Upload;
