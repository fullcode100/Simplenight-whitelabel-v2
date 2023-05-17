import { SearchItem } from 'hotels/types/adapters/SearchItem';

const getKeywordSearchListHotels = (
  data: SearchItem[],
  setKeywordSearchData: (listWords: string[]) => void,
) => {
  let keywordArray: string[] = [];
  // regular expression to separate/split the inserted characters
  const splitSeparatorCharacter = /[.,:;!@#$%^&*()=+/{}[\]\s]+/;
  if (data) {
    data.forEach((element: SearchItem) => {
      const nameSplit = element.details.name.split(splitSeparatorCharacter);
      nameSplit.forEach((nameWord: string) => {
        if (nameWord.length > 2) {
          keywordArray.push(nameWord.toLowerCase().trim());
        }
      });
    });
    keywordArray = keywordArray.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    keywordArray.sort();
    setKeywordSearchData(keywordArray);
  }
};

export default getKeywordSearchListHotels;
