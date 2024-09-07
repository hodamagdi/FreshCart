import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

function Login() {
  const { setToken } = useContext(UserContext)
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Yup validation
  const schema = Yup.object().shape({
    email: Yup.string().required().email("email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z].{5,}/,
        "must be start with uppercase and 3 char. at least"
      ),
  });

  //navigate
  const navigate = useNavigate();
  //formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // submit
    onSubmit: handleSubmit,
    // Yup validation
    validationSchema: schema,
  });

  // handel on submit
  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (response.data.message == "success") {
        //navigate to home
        navigate("/");

        //set token
        setToken(response.data.token)
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="py-10">
        <h2 className="text-green-600 flex justify-center">Login Now</h2>
        {/*start registration alert */}
        {errMsg ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>
        ) : null}
        {/*end registration alert */}

        <form onSubmit={formik?.handleSubmit} className="mt-5 flex flex-col justify-center items-center">
          <div className="">

          </div>
          <div className="relative z-0 w-1/2 mb-5 group ">
            <input
              {...formik?.getFieldProps("email")}
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
              userEmail :
            </label>
            {/*start email alert */}
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
            {/*end email alert */}
          </div>
          <div className="relative z-0 w-1/2 mb-5 group">
            <input
              {...formik?.getFieldProps("password")}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-700 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              userPassword :
            </label>
            {/*start password alert */}
            {formik.errors.password && formik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.password}
              </div>
            ) : null}
            {/*end password alert */}
          </div>

          {/* forget password  */}
          <div className="w-1/2 flex justify-between ">
            <div className="">
              <Link
                to={"/forgetPassword"}
                className="font-semibold text-green-600 hover:text-green-500"
              >
                Forgot password?
              </Link>
            </div>
            <div className="">
              <p className="text-black-800 text-sm mt-8 text-center dark:text-white inline">
                Don't have account yet?
                <Link
                  to={"/register"}
                  className="text-green-500 font-semibold hover:underline ml-1"
                >
                  Create one.
                </Link>
              </p>
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="text-white mt-2 disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
