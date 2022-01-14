import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { getFeatures } from '../../../../../store/selectors/core';

const { Option } = Select;

const CategorySelect = () => {
  const features = useSelector(getFeatures);
  const featureNames = Object.keys(features);

  const getFeaturesAsOptions = () =>
    featureNames.map((feature) => {
      if (features[feature]) {
        return (
          <Option key={feature} value={feature}>
            {feature}
          </Option>
        );
      }
      return null;
    });

  return (
    <Select defaultValue="default">
      <Option value="default" disabled>
        Category
      </Option>
      {getFeaturesAsOptions()}
    </Select>
  );
};

export default CategorySelect;
