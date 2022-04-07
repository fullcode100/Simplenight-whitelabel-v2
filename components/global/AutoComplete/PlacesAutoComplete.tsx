// import React, { useCallback, useEffect, useState } from 'react';
// import PlacesAutocomplete, {
//   getLatLng,
//   geocodeByAddress,
// } from 'react-places-autocomplete';
// import isEmpty from 'lodash/isEmpty';
// import cx from 'classnames';
// import { Input } from 'antd';

// import styles from './PlaceAutoComplete.module.scss';
// import { useTranslation } from 'react-i18next';

// const PlaceAutoComplete = ({
//   value,
//   onChange,
//   searchOptions,
//   className,
//   placeholder = 'Search Location',
//   showStartIcon = false,
//   hideEndIcon = false,
// }) => {
//   const [t, i18next] = useTranslation('global');
//   const loadingMessage = t('loading', 'Loading');

//   const [street, setStreet] = useState('');
//   const apiKey = process.env.REACT_APP_GOOGLE_MAP_KEY;
//   const [, setScriptError] = useState(false);

//   useEffect(() => {
//     setStreet(value?.address);
//   }, [value]);

//   const handleScriptError = () => {
//     setScriptError(true);
//   };

//   const handleSelect = useCallback(
//     (address) => {
//       if (!address) {
//         return;
//       }

//       geocodeByAddress(address)
//         .then(async (results) => {
//           const { long_name: postalCode = '' } =
//             results[0].address_components.find((c) =>
//               c.types.includes('postal_code'),
//             ) || {};
//           const { long_name: streetNumber = '' } =
//             results[0].address_components.find((c) =>
//               c.types.includes('street_number'),
//             ) || {};
//           const { long_name: route = '' } =
//             results[0].address_components.find((c) =>
//               c.types.includes('route'),
//             ) || {};
//           const { long_name: cityName = '' } =
//             results[0].address_components.find((c) =>
//               c.types.includes('locality'),
//             ) || {};
//           const { long_name: stateLongName = '' } =
//             results[0].address_components.find((c) =>
//               c.types.includes('administrative_area_level_1'),
//             ) || {};
//           const { short_name: stateShortName = '' } =
//             results[0].address_components.find((c) =>
//               c.types.includes('administrative_area_level_1'),
//             ) || {};
//           const { long_name: countryLongName = '' } =
//             results[0].address_components.find((c) =>
//               c.types.includes('country'),
//             ) || {};
//           const { short_name: countryShortName = '' } =
//             results[0].address_components.find((c) =>
//               c.types.includes('country'),
//             ) || {};
//           const latlng = await getLatLng(results[0]);
//           const airport = results[0].address_components.find((c) =>
//             c.types.includes('airport'),
//           );
//           const locationName = address.split(',')[0];
//           let airportCode;

//           if (airport) {
//             const startIndex = locationName.indexOf('(');
//             const endIndex = locationName.indexOf(')');
//             airportCode = locationName.slice(startIndex + 1, endIndex);
//           }
//           const trainStation = !isEmpty(
//             results[0].address_components.find((c) =>
//               c.types.includes('train_station'),
//             ),
//           );
//           const addressObject = {
//             latitude: latlng.lat,
//             longitude: latlng.lng,
//             locationName,
//             addressLine: `${streetNumber} ${route}`,
//             cityName,
//             postalCode,
//             stateProv: {
//               value: stateLongName,
//               StateCode: stateShortName,
//             },
//             countryName: {
//               value: countryLongName,
//               stateCode: countryShortName,
//             },
//             airport,
//             airportCode,
//             trainStation,
//             address,
//           };

//           setStreet(address);
//           onChange(addressObject);
//         })
//         // eslint-disable-next-line no-console
//         .catch((error) => console.log(error));
//     },
//     [setStreet, onChange],
//   );

//   const handleChange = (address) => {
//     setStreet(address);

//     if (address === '') {
//       onChange(null);
//     }
//   };

//   return (
//     <div className={styles.addressContainer}>
//       <PlacesAutocomplete
//         value={street || ''}
//         onChange={handleChange}
//         onSelect={handleSelect}
//         debounce={10}
//         searchOptions={searchOptions}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div className={styles.autoCompleteContainer}>
//             <Input
//               prefix={showStartIcon && <PinIcon width={24} />}
//               className={className}
//               keepEvent
//               {...getInputProps({
//                 placeholder: t(
//                   placeholder || 'searchLocation',
//                   placeholder || 'Search Location...',
//                 ),
//                 className: 'search-input',
//               })}
//             />
//             {!showStartIcon && !hideEndIcon && (
//               <PinIcon className={styles.pinIcon} width={24} height={24} />
//             )}
//             {(suggestions.length > 0 || loading) && (
//               <div className={styles.dropdownContainer}>
//                 {loading && (
//                   <div className={styles.loading}>{loadingMessage}...</div>
//                 )}
//                 {suggestions.map((suggestion) => (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className: cx(styles.item, {
//                         [styles.active]: styles.suggestionActive,
//                       }),
//                     })}
//                     key={suggestion?.placeId}
//                   >
//                     <PinIcon width={16} height={16} className={styles.pinImg} />
//                     <div>{suggestion.description}</div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </PlacesAutocomplete>
//     </div>
//   );
// };

// export default PlaceAutoComplete;

export default () => <p>Not implemented</p>;
