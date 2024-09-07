import axios from 'axios';
import React, { useState } from 'react';
import Loading from '../Loading/Loading';

export default function BrandItem({ brand }) {
  const [specificBrand, setSpecificBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // get specific brand 
  async function getSpecificBrand(brandId) {
    setIsLoading(true);
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands/" + brandId);
      setSpecificBrand(data.data);
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
    <div>
      {/* brand card  */}
      <div
        className="border border-gray-300 flex flex-col justify-center items-center hover:shadow-md hover:shadow-green-300 transition-shadow rounded-md bg-white cursor-pointer"
        key={brand._id}
        onClick={() => getSpecificBrand(brand._id)}
      >
        <img src={brand?.image} alt={brand?.name} />
        <p className='pb-4'>{brand?.name}</p>
      </div>
       {/* Loading before modal appears  */}
       {isLoading && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loading/>
         </div>
      )}
      {/*specific brand Modal  */}
      {isModalOpen && specificBrand && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg ">
            <div className=" flex justify-end m-2">

              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 ms-auto"
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
            {isLoading ? (
              <Loading />
            ) : (
              <>

                <div className='flex justify-center items-center gap-6 px-8'>
                  <div className="flex flex-col gap-4 justifay-center items-center">
                    <h2 className='text-xl font-bold text-green-600'>{specificBrand.name}</h2>
                    <p>{specificBrand.slug}</p>
                  </div>
                  <img src={specificBrand.image} alt={specificBrand.name} />
                </div>
                <div className=" flex justify-end m-4">
                  <button
                    onClick={handleCloseModal}
                    className=" bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </>

            )}
          </div>
        </div>
      )}
    </div>
  );
}
