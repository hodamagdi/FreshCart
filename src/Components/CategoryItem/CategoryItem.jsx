import { useState } from "react";
import axios from "axios";  
import Loading from "../Loading/Loading";

function CategoryItem({ category }) {
  const [subCategory, setSubCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function getSubCategoryOnCategory(CategoryId) {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories/" + CategoryId +"/subcategories"
      );
      setSubCategory(response.data.data);
      setIsModalOpen(true);
    } catch (error) {
       error
    } finally {
      setIsLoading(false);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={() => getSubCategoryOnCategory(category?._id)}>
        {/* Categories cards  */}
        <div className="flex flex-col border border-gray-300 border-solid rounded-md hover:shadow-md hover:shadow-green-300 transition-shadow cursor-pointer">
          <img
            src={category?.image}
            alt={category?.name || "Category"}
            className="h-[300px] object-cover object-center"
          />
          <h3 className="text-green-600 self-center text-2xl py-4">
            {category?.name}
          </h3>
        </div>
      </div>
      {/* Loading before modal appears  */}
      {isLoading && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loading/>
         </div>
      )}
      {/*sub category Modal  */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-green-600">
                {category?.name} Subcategories
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
             { subCategory.length > 0 ? (
                subCategory.map((subC) => (
                  <div key={subC._id} className="border-2 border-gray-300 p-1">
                    {subC?.name}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No subcategories available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryItem;
