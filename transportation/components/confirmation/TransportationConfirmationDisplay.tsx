import { Dispatch, SetStateAction } from 'react';
import { Item, PrimaryContact } from 'types/booking/bookingType';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import CollapseUnbordered from 'components/global/CollapseUnbordered/CollapseUnbordered';


interface CarConfirmationDisplayProps {
    item?: Item;
    primaryContact?: PrimaryContact;
    loading?: boolean;
    setLoading?: Dispatch<SetStateAction<boolean>>;
    Category: CategoryOption;
}

const TransportationConfirmationDisplay = ({
    item,
    primaryContact,
    loading,
    setLoading,
    Category,
}: CarConfirmationDisplayProps) => {
    return (
        <CollapseUnbordered
            title={<></>}
            body={<></>}
        />
    );
};

export default TransportationConfirmationDisplay;