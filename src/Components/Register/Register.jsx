import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

function Register() {
  // errorMsg
  const [errMsg, setErrMsg] = useState("")
  // is loading
  const [isLoading, setIsLoading] = useState(false)
  //navigate 
  const navigate = useNavigate()

  //usercontext
  const { setToken } = useContext(UserContext);

  // Yup validation
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .min(3, "name must be at least 3 char.")
      .max(10, "name must be 10 char. max"),
    email: Yup.string().required().email("email is not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Z].{5,}/,
        "must be start with uppercase and 3 char. at least"
      ),
    rePassword: Yup.string()
      .required("must be matches the password")
      .oneOf([Yup.ref("password")]),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}/, "phone must be valied egyption num"),
  });

  //formik 
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // submit
    onSubmit: handleSubmit,
    // Yup validation
    validationSchema: schema,
  });

  // handel on submit
  async function handleSubmit(values) {
    setIsLoading(true)
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message == "success") {
        //navigate to home
        navigate('/')

        //context
        setToken(data.token)
      }
      console.log(res);
    } catch (error) {
      setErrMsg(error.response.data.message)
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div>
        <h2 className="text-green-600 flex justify-center">Register Now :</h2>
        {/*start registration alert */}
        {errMsg ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>)
          : null
        }
        {/*end registration alert */}

        <form onSubmit={formik.handleSubmit} className="mt-5 flex flex-col justify-center items-center">
          <div className="relative z-0 w-1/2 my-5 group">
            <input
              {...formik.getFieldProps("name")}
              type="name"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              userName :
            </label>
            {/*start name alert */}
            {formik.errors.name && formik.touched.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.name}
              </div>
            ) : null}
            {/*end name alert */}
          </div>
          <div className="relative z-0 w-1/2 mb-5 group">
            <input
              {...formik.getFieldProps("email")}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
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
              {...formik.getFieldProps("password")}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
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
          <div className="relative z-0 w-1/2 mb-5 group">
            <input
              {...formik.getFieldProps("rePassword")}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              userRePassword :
            </label>
            {/*start rePassword alert */}
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            ) : null}
            {/*end rePassword alert */}
          </div>

          <div className="relative z-0 w-1/2 mb-5 group">
            <input
              {...formik.getFieldProps("phone")}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              userPhone :
            </label>
            {/*start phone alert */}
            {formik.errors.phone && formik.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.phone}
              </div>
            ) : null}
            {/*end phone alert */}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <FaSpinner className='animate-spin' /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
