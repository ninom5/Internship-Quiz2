import { useState } from "react";
import { axiosAPI } from "../../constants/axiosAPI";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    try {
      const response = await axiosAPI.post("/user/login", loginData);

      if (!response.data?.token) {
        toast.error("Invalid email or password");
        return;
      }

      const token = response.data;
      sessionStorage.setItem("jwt", token);
      toast.success("Successfully logged in");
      setLoginData({
        email: "",
        password: "",
      });
    } catch (error: any) {
      console.error("Error trying to log in:", error);

      if (error.response)
        toast.error(
          error.response.data?.message || "Invalid email or password"
        );
      else toast.error("Network error, please try again");
    }
  };

  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto w-[50%]">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto" style={{ padding: "20px" }}>
          <div style={{ marginBottom: "40px" }}>
            <h1 className="text-2xl font-semibold text-black">Login</h1>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 flex flex-col gap-7">
              <div className="relative">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="text"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Email address"
                  onChange={handleChange}
                  value={loginData.email}
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Email Address
                </label>
              </div>
              <div className="relative">
                <input
                  autoComplete="off"
                  id="password"
                  name="password"
                  type="password"
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Password"
                  onChange={handleChange}
                  value={loginData.password}
                />
                <label
                  htmlFor="password"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>
              <div className="relative" style={{ marginTop: "40px" }}>
                <button
                  type="submit"
                  className="bg-cyan-500 text-white rounded-md px-5 py-1 cursor-pointer"
                  style={{ padding: "5px 10px" }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
