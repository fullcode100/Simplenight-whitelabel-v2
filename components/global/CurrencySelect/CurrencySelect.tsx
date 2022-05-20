import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from 'core/client/services/CartClientService';
import { getCurrency } from 'store/selectors/core';
import { setCurrency } from 'store/actions/core';
import classnames from 'classnames';

const CurrencySelect = () => {
  const [t, i18n] = useTranslation();
  const currentCurrency = getCurrency();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const currencies = ['USD', 'EUR'];
  const handleChangeCurrency = async (currency: string) => {
    dispatch(setCurrency(currency));
    try {
      const data = { currency };
      await updateCart(data, i18n, state);
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="w-ful">
      <div className="relative">
        <section className="p-2 bg-dark-100 flex rounded-md gap-1">
          {currencies.map((currency) => (
            <section
              key={currency}
              className={classnames(
                ' p-2 min-w-[63px] text-center rounded-md',
                {
                  'bg-primary-200 text-primary-1000':
                    currency === currentCurrency,
                  'text-dark-1000': currency !== currentCurrency,
                },
              )}
              onClick={() => handleChangeCurrency(currency)}
            >
              <p>{currency.toUpperCase()}</p>
            </section>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CurrencySelect;
