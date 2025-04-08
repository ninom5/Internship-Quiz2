import { axiosNoAuthAPI } from "@constants/axiosAPI";

export const fetchUserByEmail = async (email: string) => {
  try {
    const response = await axiosNoAuthAPI.get(`/user/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

// export const fetchUserByEmail = (email: string) => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchByEmail = async () => {
//     try {
//       const response = await axiosAPI.get(`/user/email/${email}`);
//       if (response.status === 404) {
//         setIsLoading(false);
//         return { user, error, isLoading };
//       }
//       if (response.status !== 200)
//         throw new Error("Error fetching user by email");

//       setUser(response.data);
//     } catch (error: Error | any) {
//       toast.error(
//         `Error fetching user by email: ${error?.response?.data?.message}`
//       );
//       console.error(error);
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchByEmail();
//   }, []);

//   return { user, error, isLoading };
// };
