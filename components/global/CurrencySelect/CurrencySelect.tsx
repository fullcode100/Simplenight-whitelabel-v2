import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { updateCart } from 'core/client/services/CartClientService';
import { getCurrency } from 'store/selectors/core';
import { setCurrency } from 'store/actions/core';
import classnames from 'classnames';
import { getStoreCartId } from 'store/selectors/cart';

const CurrencySelect = () => {
  const [t, i18n] = useTranslation();
  const currentCurrency = getCurrency();
  const dispatch = useDispatch();
  const currencies = ['USD', 'EUR'];
  const cartId = getStoreCartId() ?? null;

  const handleChangeCurrency = async (currency: string) => {
    try {
      const data = { currency };
      await updateCart(data, cartId, i18n);
      dispatch(setCurrency(currency));
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="mt-3">
      <div className="relative">
        <section className="flex gap-1 p-2 rounded-md bg-dark-100">
          {currencies.map((currency) => {
            const isActive = currency === currentCurrency;
            const className = classnames(
              ' p-2 w-[63.75px] rounded-md h-[36px] grid place-content-center cursor-pointer',
              {
                'bg-primary-200 text-primary-1000': isActive,
                'text-dark-1000': !isActive,
              },
            );
            return (
              <section
                key={currency}
                className={className}
                onClick={() => handleChangeCurrency(currency)}
              >
                <p className="cursor-pointer select-none">
                  {currency.toUpperCase()}
                </p>
              </section>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default CurrencySelect;
