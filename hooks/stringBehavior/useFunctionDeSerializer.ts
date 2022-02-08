export const useFunctionDeSerializer = (functionString: string): Function => {
  const encapsulatedFunction = new Function(`return ${functionString}`);
  return encapsulatedFunction();
};
