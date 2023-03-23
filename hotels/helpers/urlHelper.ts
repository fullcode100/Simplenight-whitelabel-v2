// this function takes a URI encoded string and decodes it, replacing any percent-encoded characters with their original characters.
// we are doing this becuase some parameters are being encoded in a way that produces additional % characters
export const decodeAddressQueryParam = (addressQueryParam: string) => {
  let decodedAddress = decodeURIComponent(addressQueryParam);
  while (/%25([0-9A-Fa-f]{2})/g.test(decodedAddress)) {
    decodedAddress = decodedAddress.replace(
      /%25([0-9A-Fa-f]{2})/g,
      (match, code) => {
        return String.fromCharCode(parseInt(code, 16));
      },
    );
  }
  decodedAddress = decodedAddress.replace(/%20/g, ' ');
  decodedAddress = decodedAddress.replace(/%2C/g, ',');
  return decodedAddress;
};
