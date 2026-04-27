import { Button } from '@strapi/design-system';
import axios from '../../utils/axiosInstance';
import { AttributeType, GeneratedData } from '../../pages/HomePage/types';

const COUNT_UPLOADED_DATA_ONCE = 25;

interface Props {
	isUploadingData: boolean;
	attributes: any;
	selectedType: any;
	isFlushedPreviousData: boolean;
	isPublished: boolean;
	checkedAttributes: string[];
	generatedData: GeneratedData[];
	onChangeIsUploadingData: (value: boolean) => void;
	onChangeShowAlert: (value: boolean) => void;
	onChangeUploadedError: (value: boolean) => void;
	onUploadSuccess?: () => void;
}

const Upload = ({
	isUploadingData,
	attributes,
	isFlushedPreviousData,
	selectedType,
	isPublished,
	checkedAttributes,
	generatedData,
	onChangeIsUploadingData,
	onChangeShowAlert,
	onChangeUploadedError,
	onUploadSuccess
}: Props) => {
	const handleUploadData = async () => {
		onChangeIsUploadingData(true);
		onChangeShowAlert(false);
		onChangeUploadedError(false);
		const mediaKeys = Object.keys(attributes).filter(
			(key) => attributes[key].type === AttributeType.Media && checkedAttributes.includes(key)
		);

		if (selectedType) {
			try {
				if (isFlushedPreviousData) {
					await axios.post(`/generate-data/flush/${selectedType.uid}`);
				}
				let uploadData = async (data: GeneratedData[]) => {
					if (!data.length) {
						return;
					}
					let dataByCount = data.slice(0, COUNT_UPLOADED_DATA_ONCE);
					let uploadedMediaData: { [key: string]: any[] } = {};

					if (mediaKeys.length) {
						const mediaData = mediaKeys.reduce((prev, key) => {
							return {
								...prev,
								[key]: dataByCount.map((item) => item[key])
							};
						}, {});
						try {
							const response = await axios.post<{ data: any }>(
								'/generate-data/upload',
								mediaData
							);
							uploadedMediaData = response.data;
						} catch (err) {
							onChangeUploadedError(true);
						}
					}

					const transformedData = dataByCount.map((item, index) => {
						const filtered = checkedAttributes.reduce((prev, key) => {
							if (uploadedMediaData[key]) {
								return {
									...prev,
									[key]: uploadedMediaData[key][index].map(
										(uploadedItem: any) => uploadedItem.id
									)
								};
							}
							return { ...prev, [key]: item[key] };
						}, {} as { [key: string]: any });
						return filtered;
					});

					await axios.post(`/generate-data/create/${selectedType.uid}`, {
						data: transformedData,
						status: isPublished ? 'published' : 'draft'
					});

					return uploadData(data.slice(COUNT_UPLOADED_DATA_ONCE));
				};
				await uploadData(generatedData);
				onUploadSuccess?.();
			} catch (err) {
				onChangeUploadedError(true);
			}
		}
		onChangeIsUploadingData(false);
		onChangeShowAlert(true);
	};
	return (
		<Button variant="secondary" loading={isUploadingData} onClick={handleUploadData}>
			Upload data
		</Button>
	);
};

export default Upload;
