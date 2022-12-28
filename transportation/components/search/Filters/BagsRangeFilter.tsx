import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import RangeSlider from 'components/global/RangeSlider/RangeSlider';
import FilterContainer from './FilterContainer';
import FilterTitle from './FilterTitle';

interface BagsRangeFilterProps {
    minBags: string;
    maxBags: string;
    onChangeMaxPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
    onChangeMinPrice:
    | Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
    setMaxValue: any;
    setMinValue: any
}

const BagsRangeFilter = ({
    minBags,
    maxBags,
    onChangeMinPrice,
    onChangeMaxPrice,
    setMaxValue,
    setMinValue
}: BagsRangeFilterProps) => {
    const [t] = useTranslation('ground-transportation');
    const bagsRangeLabel = t('bagsRange', 'Bags Range');

    return (
        <FilterContainer>
            <FilterTitle label={bagsRangeLabel} />
            <RangeSlider
                minValue={minBags ? parseInt(minBags) : 1}
                maxValue={maxBags ? parseInt(maxBags) : 3}
                min={1}
                max={3}
                step={1}
                minDifference={1}
                type="number"
                setMinState={onChangeMinPrice}
                setMaxState={onChangeMaxPrice}
                setMaxValue={setMaxValue}
                setMinValue={setMinValue}
            />
        </FilterContainer>
    );
};

export default BagsRangeFilter;