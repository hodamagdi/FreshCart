import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { Helmet } from 'react-helmet';


export default function ResetPassword() {
    const { setToken } = useContext(UserContext);
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    // Yup validation
    const schema = Yup.object().shape({
      email: Yup.string().required("Email is required").email("Email is not valid"),
      newPassword: Yup.string()
        .required("Password is required")
        .matches(
          /^[A-Z].{5,}/,
          "Password must start with an uppercase letter and be at least 6 characters long"
        ),
    });
  
    // Navigation
    const navigate = useNavigate();
  
    // Formik
    const formik = useFormik({
      initialValues: {
        email: "",
        newPassword: "",
      },
      onSubmit: handleSubmit,
      validationSchema: schema,
    });
  
    // Handle form submission
    async function handleSubmit(values) {
        console.log("Submitting values:", values);  // Log the form values
        setIsLoading(true);
        try {
          const { data } = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
            values
          );
          setToken(data);
          navigate("/login");
        } catch (error) {
          console.log("Error details:", error);  // Log detailed error
          setErrMsg(error.response?.data?.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }
  
    return (
      <>
      <Helmet>
        <title>ResetPassword</title>
      </Helmet>
      <div>
        <h2 className="text-green-600 flex justify-center">Reset Password</h2>
  
        {/* Error message display */}
        {errMsg && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>
        )}
  
        <form onSubmit={formik.handleSubmit} className="mt-5 flex flex-col justify-center items-center">
          {/* Email input */}
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
            {formik.errors.email && formik.touched.email && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.email}
              </div>
            )}
          </div>
  
          {/* Password input */}
          <div className="relative z-0 w-1/2 mb-5 group">
            <input
              {...formik.getFieldProps("newPassword")}
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-700 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password:
            </label>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {formik.errors.newPassword}
              </div>
            )}
          </div>
  
          {/* Submit button */}
          <button
            disabled={isLoading}
            type="submit"
            className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
          </button>
        </form>
      </div>
      </>
    );
  }
