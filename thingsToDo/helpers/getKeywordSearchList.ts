import { SearchItem } from 'thingsToDo/types/adapters/SearchItem';

const getKeywordSearchList = (
  data: SearchItem[],
  setKeywordSearchData: any,
) => {
  let keywordArray: string[] = [];
  const regex = /[.,:;!@#$%^&*()=+/{}[\]\s]+/;
  if (data) {
    data.forEach((element: SearchItem) => {
      const nameSplit = element.name.split(regex);
      const descriptionSplit = element.description.split(regex);
      nameSplit.forEach((nameWord: string) => {
        if (nameWord.length > 2) {
          keywordArray.push(nameWord.toLowerCase().trim());
        }
      });
      descriptionSplit.forEach((descriptionWord: string) => {
        if (descriptionWord.length > 2) {
          keywordArray.push(descriptionWord.toLowerCase().trim());
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

export default getKeywordSearchList;
