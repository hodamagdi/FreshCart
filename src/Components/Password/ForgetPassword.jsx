import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { Helmet } from "react-helmet";

function ForgetPassword() {
  const { setToken } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Yup validation schema
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const navigate = useNavigate();

  // formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: handleSubmit,
    validationSchema: schema,
  });

  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      console.log(response.data.statusMsg);
      if (response.data.statusMsg === "success") {
        setToken(response.data.token); 
        localStorage.setItem("userEmail" , values.email)
        navigate("/verifyResetCode"); 
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Something went wrong");
      console.log(error.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <Helmet>
        <title>ForgetPassword</title>
      </Helmet>
    <div className="py-10">
      <h2 className="text-green-600 flex justify-center ">Forget Password ?</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-5 flex flex-col justify-center items-center"
      >
        <div className="relative z-0 w-1/2 mb-5 group">
          <input
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-700 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            User Email:
          </label>
          {/* Email validation error */}
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
        </button>
        {errMsg && (
          <div
            className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>
        )}
      </form>
    </div>
    </>
  );
}

export default ForgetPassword;
