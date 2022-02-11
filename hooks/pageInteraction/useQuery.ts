import { useRouter } from 'next/router';

const useQuery = () => useRouter().query;

export default useQuery;
