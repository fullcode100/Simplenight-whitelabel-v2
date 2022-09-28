/* eslint-disable camelcase */
import { useCategory } from 'hooks/categoryInjection/useCategory';
import { injectProps } from 'helpers/reactUtils';
import CollapseBordered from 'components/global/CollapseBordered/CollapseBordered';
import BreakdownSummary from 'hotels/components/PriceBreakdownModal/components/BreakdownSummary';

const PaymentCartItem = ({ item }: any) => {
  const CartItemHeader = () => {
    const category = useCategory(item.category.toLowerCase());
    return injectProps(category?.checkoutDisplay, {
      item: item,
    });
  };

  const CartItemBreakdown = () => {
    const category = useCategory(item.category.toLowerCase());
    return injectProps(category?.breakdownDisplay, {
      item: item,
      showCollapse: false,
    });
  };

  const { check_in_instructions: checkInInstructions } = item.extended_data;

  const Instructions = () => {
    const {
      instructions,
      special_instructions: specialInstructions,
      fees,
    } = checkInInstructions;
    const { mandatory, optional } = fees;

    const instructionsText = `${instructions}
    ${specialInstructions}
    ${mandatory}
    ${optional}
    `;

    const policies = checkInInstructions?.policies ?? '';

    const hasInstructions = instructionsText && instructionsText !== '';
    const hasPolicies = policies && policies !== '';

    return (
      <section className="mb-6 text-base leading-[24px] font-normal text-dark-1000">
        {hasInstructions && <>{instructionsText}</>}
        {hasPolicies && (
          <>
            <br />
            {policies}
          </>
        )}
      </section>
    );
  };

  const CartItemBody = () => {
    return (
      <section className="mb-6 px-4">
        <CartItemBreakdown />
      </section>
    );
  };

  return (
    <section className="space-y-5 py-6">
      <CollapseBordered
        title={<CartItemHeader />}
        body={<CartItemBody />}
        footer={<BreakdownSummary rate={item.rate} showTotal={true} />}
      />
      {checkInInstructions && <Instructions />}
    </section>
  );
};

export default PaymentCartItem;
