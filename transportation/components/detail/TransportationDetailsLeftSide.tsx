import React, { FC } from 'react';
import { TransportationDetailsInformation } from './TransportationDetailsInformation';
import { TransportationDetailsDescription } from './TransportationDetailsDescription';
import { TransportationDetailsPolicies } from './TransportationDetailsPolicies';
import { TransportationDetailsLocation } from './TransportationDetailsLocation';
import { Quote } from 'transportation/types/response/TransportationSearchResponse';

type Coordinates = {
    latitude: number
    longitude: number
}

type SearchDetails = {
    pickUpDate: string
    pickUpTime: string
    pickUpAddress: string
    pickUpCoordinates: Coordinates
    dropOffDate: string
    dropOffTime: string 
    dropOffAddress: string
    dropOffCoordinates: Coordinates
}
interface TransportationDetailProps {
    transportation: Quote;
    searchDetails: SearchDetails
}

export const TransportationDetailsLeftSide: FC<TransportationDetailProps> = ({
    transportation,
    searchDetails
}) => {

    return (
        <section className="lg:flex lg:flex-col lg:w-[75%] lg:h-full">
            <TransportationDetailsInformation transportation={transportation} />
            <hr className='lg:border-t-2' />
            <TransportationDetailsDescription transportation={transportation} />
            <hr className='lg:border-t-2' />
            <section className="lg:flex lg:flex-row lg:gap-1 lg:flex-1 lg:h-full">
                <TransportationDetailsPolicies transportation={transportation} />
                <hr className='lg:border-l-2 lg:h-full' />
                <TransportationDetailsLocation transportation={transportation} searchDetails={searchDetails} />
            </section>
        </section>
    );
};
