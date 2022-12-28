import { CategoryOption } from 'types/search/SearchTypeOptions';
import CategoryIcon from 'components/global/CategoryIcon/CategoryIcon';
import { TransportationSearchForm } from './components/search/TransportationSearchForm';
import TransportationResultsDisplay from 'transportation/components/search/TransportationResultsDisplay';
import { TransportationClientSearcher } from './core/search/TransportationClientSearcher';
import { TransportationServerSearcher } from './core/search/TransportationServerSearcher';
import { TransportationSearchFormReadState } from './components/search/TransportationSearchFormReadState';
import { TransportationDetailsDisplay } from './components/detail/TransportationDetailsDisplay';
import { TransportationClientDetailer } from './core/detail/TransportationClientDetailer';
import { TransportationServerDetailer } from './core/detail/TransportationServerDetailer';
import { TransportationItineraryDisplay } from './components/itinerary';
import { TransportationBreakdownDisplay } from './components/itinerary';
import TransportationCheckoutDisplay from './components/checkout/TransportationCheckoutDisplay';
import TransportationCheckoutItemDisplay from './components/checkout/TransportationCheckoutItemDisplay';
import TransportationConfirmationDisplay from './components/confirmation/TransportationConfirmationDisplay';

export const TRANPORTATION_CATEGORY = 'ground-transportation';

const Category: CategoryOption = {
    id: 3,
    name: TRANPORTATION_CATEGORY,
    value: TRANPORTATION_CATEGORY,
    icon: <CategoryIcon categoryName={TRANPORTATION_CATEGORY} className={'h-5 w-5'} />,
    selectedIcon: <></>,
    searchForm: <TransportationSearchForm />,
    secondarySearchOptions: <></>,
    readStateSearchForm: <TransportationSearchFormReadState />,
    resultsDisplay: <></>,
    detailDisplay: <></>,
    itineraryDisplay: <></>,
    breakdownDisplay: <></>,
    checkoutDisplay: <></>,
    confirmationDisplay: <></>,
    cancelledDisplay: <></>,
    core: {
        urls: {
            search: {
                client: '/transportation',
                server: '/categories/ground-transportation/items/details',
            },
            detail: {
                client: '/transportation',
                server: '/categories/ground-transportation/items/details',
            },
        },
        ClientSearcher: null,
        ServerSearcher: null,
        ClientDetailer: null,
        ServerDetailer: null,
    },
};

Category.resultsDisplay = <TransportationResultsDisplay TransportationCategory={Category} />;
Category.detailDisplay = <TransportationDetailsDisplay Category={Category} />;

Category.itineraryDisplay = <TransportationItineraryDisplay Category={Category} />;
Category.breakdownDisplay = <TransportationBreakdownDisplay Category={Category} />;
Category.checkoutDisplay = <TransportationCheckoutDisplay Category={Category} />;
Category.checkoutItemDisplay = (
    <TransportationCheckoutItemDisplay Category={Category} />
);
Category.confirmationDisplay = <TransportationConfirmationDisplay Category={Category} />;

Category.core.ClientSearcher = new TransportationClientSearcher(Category);
Category.core.ServerSearcher = new TransportationServerSearcher(Category);

Category.core.ClientDetailer = new TransportationClientDetailer(Category);
Category.core.ServerDetailer = new TransportationServerDetailer(Category);

export const TransportationCategory = Category;