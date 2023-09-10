import useSWR from 'swr';
import Cookies from 'js-cookie';

const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Unable to fetch data');
  }

  return response.json();
};

export function useUserData() {
  // Retrieve the user ID from cookies
  const userId = Cookies.get('userId');

  // Check if userId is undefined or not present
  if (!userId) {
    return {
      user: null, // You can set user to null or handle this case as needed
      isLoading: false, // No need to load if userId is not defined
      isError: false, // No error in this case
      mutateUserData: () => {}, // You can provide a dummy function here
    };
  }

  // Construct the URL using the retrieved user ID
  const apiUrl = `/api/user/${userId}`; // Use the dynamic userId here

  const { data, error, mutate } = useSWR(apiUrl, fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    mutateUserData: mutate,
  };
}
