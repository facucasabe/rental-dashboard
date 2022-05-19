import { useState, useEffect } from 'react'

import { Header } from '../components/Header'

import { Pagination } from '../components/Pagination'

import { Modal } from '../components/Modal'

import { FormAmenity } from '../forms/FormAmenity'

import { endPoints } from '../services/main'

import { PlusIcon } from '@heroicons/react/solid'

import axios from 'axios'

import { useAlert } from '../hooks/useAlert'

import { Alert } from '../components/Alert'

const Amenities = () => {
  const [amenities, setAmenities] = useState([])

  const [open, setOpen] = useState(false)

  const { alert, setAlert, toggleAlert } = useAlert()

  useEffect(() => {
    async function getAmenities () {
      const response = await axios.get(endPoints.amenities.allAmenities)

      setAmenities(response.data)
    }

    try {
      getAmenities()
    } catch (error) {
      console.error(error)
    }
  }, [alert])

  const [currentPage, setCurrentPage] = useState(1)
  const [amenitiesPerPage, setAmenitiesPerPage] = useState(6)

  const indexOfLastAmenity = currentPage * amenitiesPerPage
  const indexOfFirstUser = indexOfLastAmenity - amenitiesPerPage
  const currentAmenities = amenities?.slice(indexOfFirstUser, indexOfLastAmenity)

  const paginateFront = () => setCurrentPage(currentPage + 1)
  const paginateBack = () => setCurrentPage(currentPage - 1)

  return (
    <div className='Amenities'>
      <Header />
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
        <div className='lg:flex lg:items-center lg:justify-between mb-8'>
          <div className='flex-1 min-w-0'>
            <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>Lista de Comodidades</h2>
          </div>
          <div className='mt-5 flex lg:mt-0 lg:ml-4'>
            <span className='sm:ml-3'>
              <button
                onClick={() => setOpen(true)}
                type='button'
                className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              >
                <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
                Agregar Comodidades
              </button>
            </span>
          </div>
        </div>
      </div>
      <Alert alert={alert} handleClose={toggleAlert} />
      {
        amenities?.length > 6 && <Pagination
          thingsPerPage={amenitiesPerPage}
          totalThings={amenities?.length}
          currentPage={currentPage}
          paginateBack={paginateBack}
          paginateFront={paginateFront}
                                 />
      }
      <div className='flex flex-col max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      # ID
                    </th>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Comodidad
                    </th>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {currentAmenities?.map((amenity) => (
                    <tr key={amenity.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{amenity.id}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize'>{amenity.name}</td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        {
                          amenity.isDeleted
                            ? <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'>Eliminado</span>
                            : <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>Activo</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <FormAmenity setOpen={setOpen} setAlert={setAlert} />
      </Modal>
    </div>
  )
}

export { Amenities }
