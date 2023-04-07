import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function Shipment() {
  const [expand, setExpand] = useState(false);
  const [expand1, setExpand1] = useState(true);
  const [expand2, setExpand2] = useState(true);
  const [expand3, setExpand3] = useState(true);
  return (
    <div
      className='content d-flex flex-column flex-column-fluid'
      id='kt_content'
    >
      {/*begin::Container*/}
      <div className='container-fluid' id='kt_content_container'>
        {/*
         */}
        <div className='row gx-5 gx-xl-5'>
          {/*begin::Col*/}
          <div className='col-xl-12 mb-5 mb-xl-5'>
            <div className='card card-flush h-xl-100'>
              <div className='card-body '>
                {/*begin::Section*/}
                <div className='m-0'>
                  {/*begin::Heading*/}
                  <div
                    className='d-flex align-items-center collapsible py-3 toggle mb-0 '
                    // data-bs-toggle='collapse'
                    // data-bs-target='#kt_job_4_1'
                  >
                    {/*begin::Icon*/}
                    <div
                      className='btn btn-sm btn-icon mw-20px btn-active-color-primary me-5'
                      onClick={() => setExpand(!expand)}
                    >
                       {!expand ? (
                        <div className='svg-icon toggle-on svg-icon-danger svg-icon-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.3'
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              fill='black'
                            />
                            <rect
                              x='6.0104'
                              y='10.9247'
                              width={12}
                              height={2}
                              rx={1}
                              fill='black'
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className='svg-icon toggle-on svg-icon-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.3'
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              fill='black'
                            />
                            <rect
                              x='10.8891'
                              y='17.8033'
                              width={12}
                              height={2}
                              rx={1}
                              transform='rotate(-90 10.8891 17.8033)'
                              fill='black'
                            />
                            <rect
                              x='6.01041'
                              y='10.9247'
                              width={12}
                              height={2}
                              rx={1}
                              fill='black'
                            />
                          </svg>
                        </div>
                      )}
                   
                    </div>
                    {/*end::Icon*/}
                    {/*begin::Title*/}
                    <h4 className='text-gray-700 fw-bolder cursor-pointer mb-0'>
                      Step: 1 Choose Inventory To Send
                    </h4>
                    {/*end::Title*/}
                  </div>
                  {/*end::Heading*/}
                  {/*begin::Body*/}
                  {!expand && (
                    <div id='kt_job_4_1' className='collapse show fs-6 ms-1'>
                      {/*begin::Text*/}
                      <div className='mb-4 text-gray-600 fw-bold fs-6 ps-10 '>
                        <div className=' row mb-5'>
                          <div className='col-md-3'>
                            <label
                              htmlFor
                              className='fs-7 fw-bolder text-dark mb-1'
                            >
                              Ship From
                            </label>
                            <select
                              name
                              id
                              className='form-select form-select-solid form-select-sm'
                            >
                              <option value>
                                {' '}
                                John Doe 11601 Wilshire Blvd., Suite 1818, Los
                                Angeles, CA 90025
                              </option>
                            </select>
                          </div>
                          <div className='col-md-2'>
                            <label
                              htmlFor
                              className='fs-7 fw-bolder text-dark mb-1'
                            >
                              Marketplace destination
                            </label>
                            <select
                              name
                              id
                              className='form-select form-select-solid form-select-sm'
                            >
                              <option value> United States</option>
                            </select>
                          </div>
                          <div className='col-md-3'>
                            <label
                              htmlFor
                              className='fs-7 fw-bolder text-dark mb-1'
                            >
                              Fulfillment capability
                            </label>
                            <select
                              name
                              id
                              className='form-select form-select-solid form-select-sm'
                            >
                              <option value>
                                {' '}
                                Standard Fulfillment by Amazon
                              </option>
                              <option value> Blank box</option>
                              <option value> Mixture of both</option>
                            </select>
                          </div>
                        </div>
                        <div className='separator separator-dashed my-2' />
                        <div className=' row'>
                          <div className='col-md-12'>
                            <div className='table-responsive'>
                              <table className='table table-row-dashed fs-7 table-row-gray-300 align-middle gx-4 gy-4'>
                                <thead>
                                  <tr className='text-start text-gray-800 fw-boldest fs-7 '>
                                    <th className='w-50px'>
                                      <label className='form-check form-check-sm form-check-custom form-check-solid'>
                                        <input
                                          className='form-check-input'
                                          type='checkbox'
                                          defaultValue={1}
                                        />
                                        <span className='form-check-label' />
                                      </label>
                                    </th>
                                    <th className='min-w-200px'>SKU Details</th>
                                    <th className='min-w-175px'>
                                      Packing Details
                                    </th>
                                    <th className='min-w-225px'>
                                      Information / Action Required
                                    </th>
                                    <th className='min-w-150px'>
                                      Quantity to send
                                    </th>
                                    {/* <th class="min-w-225px" >Sum Of Page Views Percentage</th> */}
                                  </tr>
                                </thead>
                                <tbody className='fw-bold text-gray-800 '>
                                  <tr>
                                    <td>
                                      <label className='form-check form-check-sm form-check-custom form-check-solid'>
                                        <input
                                          className='form-check-input'
                                          type='checkbox'
                                          defaultValue={1}
                                        />
                                        <span className='form-check-label' />
                                      </label>
                                    </td>
                                    <td>
                                      <div className='d-flex align-items-center'>
                                        <div className='symbol symbol-65px me-5'>
                                          <img
                                            src='https://www.apolloclinic.com/assets/images/doctors/7659_dummy-placeholder-image-400x400.jpg'
                                            alt=''
                                            className
                                          />
                                        </div>
                                        <div className='d-flex justify-content-start flex-column'>
                                          <a
                                            href='#'
                                            className='text-dark fw-boldest text-hover-primary fs-7 title-elips2 mb-0'
                                          >
                                            Umo Lorenzo Premium Wooden Necktie
                                            and Belt Hanger, Walnut Wood Center
                                            Organizer and Storage Rack with a
                                            Non-Slip Finish - 20 Hooks
                                          </a>
                                          <div className='d-flex'>
                                            <span className='text-muted font-weight-bold  fs-7 d-flex mt-1'>
                                              <div className='text-dark'>
                                                <b className='text-dark fw-boldest'>
                                                  SKU:
                                                </b>
                                                <a
                                                  className
                                                  href
                                                  title='View on Amazon'
                                                  target='_blank'
                                                >
                                                  B09M8GXP31
                                                </a>
                                              </div>
                                            </span>
                                            <span className='text-muted font-weight-bold  fs-7 ms-4 d-flex mt-1'>
                                              <div className='text-dark'>
                                                <b className='text-dark fw-boldest'>
                                                  ASIN:
                                                </b>
                                                B09M8GXP31
                                              </div>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className='d-flex gap-4 '>
                                        <select
                                          name
                                          id
                                          className='form-select form-select-solid form-select-sm min-w-250px fs-7'
                                        >
                                          <option value>
                                            B08GMCPKSA - B08GMCPT5H
                                          </option>
                                          <option value>
                                            Individual units
                                          </option>
                                          <option value>
                                            Create new packing template
                                          </option>
                                        </select>
                                        <button className='btn btn-danger btn-icon btn-sm fs-7 ps-5 px-6'>
                                          <FontAwesomeIcon icon={faPencil}/>
                                        </button>
                                      </div>
                                    </td>
                                    <td>
                                      <span>
                                        Units Per Box :<b>12</b>
                                      </span>
                                      <br />
                                      <span>Prep Not Required</span>
                                      <br />
                                      <span>No Labeling Required</span>
                                    </td>
                                    <td>
                                      {/* <div class=" mb-1">
                                                                                      <span><i data-feather="check" class="text-success mr-50"></i><b>Ready to send</b></span><br>
                                                                                      <span class="ml-2">Boxes: 5</span><br>
                                                                                      <span class="ml-2">Units: 60</span><br>
                                                                                      <span class="ml-2">Expiration date: Dec 31, 2023</span>
                                                                                  </div> */}
                                      <div className=' d-flex'>
                                        <div className='form-group me-3'>
                                          <label
                                            htmlFor
                                            className='fs-7 fw-bolder text-dark mb-1'
                                          >
                                            Boxes
                                          </label>
                                          <input
                                            type='text'
                                            className='form-control form-control-sm form-control-solid min-w-75px '
                                          />
                                        </div>
                                        <div className='form-group me-3'>
                                          <label
                                            htmlFor
                                            className='fs-7 fw-bolder text-dark mb-1'
                                          >
                                            Units
                                          </label>
                                          <input
                                            type='text'
                                            className='form-control form-control-sm form-control-solid min-w-75px'
                                          />
                                        </div>
                                        <div className='form-group'>
                                          <label
                                            htmlFor
                                            className='fs-7 fw-bolder text-dark mb-1'
                                          >
                                            Expiration
                                          </label>
                                          <input
                                            className='form-control form-control-sm form-control-solid min-w-150px kt_daterangepicker_3'
                                            placeholder='Pick date rage'
                                            id
                                          />
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className='separator separator-dashed my-2' />
                        <div className=' mt-4 row align-items-center '>
                          <div className='col-md-6'>
                            <h5 className='mb-0'>
                              SKUs Ready to Send :{' '}
                              <span className='text-primary'>0</span> (0 Units)
                            </h5>
                          </div>
                          <div className='col-md-6 text-end'>
                            <span>Total prep and labeling fees: $0.00</span>
                            <button
                              type='submit'
                              className='btn btn-dark fs-7 ms-2 '
                              name='confirm_continue'
                              value='step-1'
                            >
                              Confirm and Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='separator separator-dashed' />
                </div>
                {/*end::Section*/}
                {/*begin::Section*/}

                <div className='m-0'>
                  {/*begin::Heading*/}

                  <div
                    className='d-flex align-items-center py-3 toggle mb-0'
                    // data-bs-toggle='collapse'
                    // data-bs-target='#kt_job_4_2'
                  >
                    <div
                      className='btn btn-sm btn-icon mw-20px btn-active-color-primary me-5'
                      onClick={() => setExpand1(!expand1)}
                    >
                      {!expand1 ? (
                        <div className='svg-icon toggle-off svg-icon-danger svg-icon-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.3'
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              fill='black'
                            />
                            <rect
                              x='6.0104'
                              y='10.9247'
                              width={12}
                              height={2}
                              rx={1}
                              fill='black'
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className='svg-icon toggle-off  svg-icon-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.3'
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              fill='black'
                            />
                            <rect
                              x='10.8891'
                              y='17.8033'
                              width={12}
                              height={2}
                              rx={1}
                              transform='rotate(-90 10.8891 17.8033)'
                              fill='black'
                            />
                            <rect
                              x='6.01041'
                              y='10.9247'
                              width={12}
                              height={2}
                              rx={1}
                              fill='black'
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h4 className='text-gray-700 fw-bolder cursor-pointer mb-0'>
                      Step 1 B : Pack Individual Units
                    </h4>
                  </div>
                  {/*end::Heading*/}
                  {/*begin::Body*/}
                  {!expand1 && (
                    <div className=' fs-6 ms-1'>
                      <div className='mb-4 text-gray-600 fw-bold fs-6 ps-10 '>
                        <div className=' row mt-5'>
                          <div className='col-md-6  '>
                            <h5>
                              <span>Pack Group 1</span>
                              <br />
                              <small className='mt-2 d-block text-gray-700'>
                                This SKUs can be packed together: 3 SKUs (450
                                units)
                              </small>
                            </h5>
                          </div>
                          <div className='col-md-6  text-end'>
                            <button className='btn btn-light-danger fs-bolder btn-sm fs-7'>
                              View contents{' '}
                            </button>
                          </div>
                          <div className='separator separator-dashed my-2' />
                          <div className='col-md-12 '>
                            <div className='row mt-2'>
                              <div className='col-md-4 '>
                                <div className='d-flex flex-wrap gap-4'>
                                  <div className='position-relative'>
                                    <img
                                      className='rounded'
                                      src='https://www.apolloclinic.com/assets/images/doctors/7659_dummy-placeholder-image-400x400.jpg'
                                      style={{
                                        width: '70px',
                                        height: '70px',
                                        objectFit: 'contain'
                                      }}
                                    />
                                    <div className='fs-7 fw-bolder text-primary'>
                                      x 150
                                    </div>
                                  </div>
                                  <div className='position-relative'>
                                    <img
                                      className='rounded'
                                      src='https://www.apolloclinic.com/assets/images/doctors/7659_dummy-placeholder-image-400x400.jpg'
                                      style={{
                                        width: '70px',
                                        height: '70px',
                                        objectFit: 'contain'
                                      }}
                                    />
                                    <div className='fs-7 fw-bolder text-primary'>
                                      x 150
                                    </div>
                                  </div>
                                  <div className='position-relative'>
                                    <img
                                      className='rounded'
                                      src='https://www.apolloclinic.com/assets/images/doctors/7659_dummy-placeholder-image-400x400.jpg'
                                      style={{
                                        width: '70px',
                                        height: '70px',
                                        objectFit: 'contain'
                                      }}
                                    />
                                    <div className='fs-7 fw-bolder text-primary'>
                                      x 150
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-4 '>
                                {/* <div class=" mt-50">
                                                                         <span class="d-flex justify-content-between align-items-center"><b>Packing Information for one box</b> <b><a href="">Restart</a></b></span>
                                                                              <div class="form-group d-flex align-items-center mt-1">
                                                                                 <label for="" style="width: 120px">Box dimensions (in):</label>
                                                                                 <input type="number" class="form-control form-control-sm mx-50" style="width: 70px;">
                                                                                 <label for="">X</label>
                                                                                 <input type="number" class="form-control form-control-sm mx-50" style="width: 70px;">
                                                                                 <label for="">X</label>
                                                                                 <input type="number" class="form-control form-control-sm mx-50" style="width: 70px;">
                                                                             </div>
                                                                             <div class="form-group d-flex align-items-center mt-50">
                                                                                 <label for="" style="width: 120px">Box weight (lb):</label>
                                                                                 <input type="number" class="form-control form-control-sm mx-50" style="width: 70px;">
                                                                             </div>
                                                                              <button class="btn btn-light mt-1 waves-effect waves-float waves-light">Confirm packing information</button>
                                                                          </div> */}
                                <div className>
                                  <span className='text-dark'>
                                    <b>Packing Information</b>
                                  </span>
                                  <div className='mt-50'>
                                    <span className='fs-7'>
                                      How many boxes will these units fit into?
                                    </span>
                                    <label className='form-check form-check-sm form-check-custom form-check-solid mb-4 mt-4'>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue={1}
                                      />
                                      <span className='form-check-label text-dark'>
                                        Everything will fit into one box
                                      </span>
                                    </label>
                                    <label className='form-check form-check-sm form-check-custom form-check-solid'>
                                      <input
                                        className='form-check-input'
                                        type='checkbox'
                                        defaultValue={1}
                                      />
                                      <span className='form-check-label text-dark'>
                                        Multiple boxes will be needed
                                      </span>
                                    </label>
                                    <button className='btn btn-light-danger fs-bolder btn-sm fs-7 mt-5'>
                                      confirm
                                    </button>
                                  </div>
                                </div>
                                {/* <div class=" mt-50">
                                                                             
                                                                         <span class=""><b>Packing Information for multiple boxes</b></span>
                                                                         <div class="mt-50">
                                                                             <div class="form-group">
                                                                                 <label for="">How will box content information be provided?</label>
                                                                                 <select name="" id="" class="form-control">
                                                                                     <option value="">Enter through a web form</option>
                                                                                 </select>
                                                                             </div>
                                                                             <div>You can enter box content information for up to 10 boxes using web form.</div>
                  
                                                                             <div class="form-group d-flex align-items-center mt-50">
                                                                                 <label for="">How many boxes?</label>
                                                                                 <input type="number" class="form-control form-control-sm mx-50" style="width: 100px;">
                                                                                 <label for="">Exact number not needed</label>
                                                                             </div>
                                                                              <button class="btn btn-light mt-1 waves-effect waves-float waves-light" data-toggle="modal" data-target="#webform">Open Web Form</button>
                  
                                                                         </div>
                                                                         </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='separator separator-dashed my-2 mt-4' />
                        <div className=' mt-4 row align-items-center '>
                          <div className='col-md-6'>
                            <span className='fs-7 text-dark'>
                              <b>SKUs</b>
                            </span>
                            <span className='fs-7 text-dark'>
                              already cash packed:0 (0 Units) in 0 box or boxes{' '}
                            </span>
                            <br />
                            <span className='fs-7 text-dark'>
                              Packing information for these SKUs was provided in
                              step 1
                            </span>
                          </div>
                          <div className='col-md-6 text-end'>
                            <button
                              type='submit'
                              className='btn btn-dark fs-7 ms-2 '
                              name='confirm_continue'
                              value='step-1'
                            >
                              Confirm and Continue
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='separator separator-dashed' />
                </div>

                {/*end::Section*/}
                {/*begin::Section*/}
                <div className='m-0'>
                  {/*begin::Heading*/}
                  <div
                    className='d-flex align-items-center py-3 toggle mb-0 '
                    // data-bs-toggle='collapse'
                    // data-bs-target='#kt_job_4_3'
                  >
                    <div
                      className='btn btn-sm btn-icon mw-20px btn-active-color-primary me-5'
                      onClick={() => setExpand2(!expand2)}
                    >
                      
                      {!expand2 ? (
                        <div className='svg-icon toggle-off svg-icon-danger svg-icon-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.3'
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              fill='black'
                            />
                            <rect
                              x='6.0104'
                              y='10.9247'
                              width={12}
                              height={2}
                              rx={1}
                              fill='black'
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className='svg-icon toggle-off  svg-icon-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.3'
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              fill='black'
                            />
                            <rect
                              x='10.8891'
                              y='17.8033'
                              width={12}
                              height={2}
                              rx={1}
                              transform='rotate(-90 10.8891 17.8033)'
                              fill='black'
                            />
                            <rect
                              x='6.01041'
                              y='10.9247'
                              width={12}
                              height={2}
                              rx={1}
                              fill='black'
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h4 className='text-gray-700 fw-bolder cursor-pointer mb-0'>
                      Step 2 : Confirm Shipping
                    </h4>
                  </div>
                  {/*end::Heading*/}
                  {/*begin::Body*/}
                  {!expand2 && (
                    <div className='fs-6 ms-1'>
                      <div className='mb-4 text-gray-600 fw-bold fs-6 ps-10 '>
                        <div className=' row mt-5'>
                          <div className='col-md-12'>
                            <label
                              htmlFor
                              className='fs-7 mb-1 text-dark fw-boldest'
                            >
                              Ship Date
                            </label>
                          </div>
                          <div className='col-md-3'>
                            <div className='position-relative my-1'>
                              {/*begin::Svg Icon | path: icons/duotune/general/gen021.svg*/}
                              <span className='svg-icon svg-icon-2 position-absolute top-50 translate-middle-y ms-4'>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  width={24}
                                  height={24}
                                  viewBox='0 0 24 24'
                                  fill='none'
                                >
                                  <path
                                    opacity='0.3'
                                    d='M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z'
                                    fill='currentColor'
                                  />
                                  <path
                                    d='M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z'
                                    fill='currentColor'
                                  />
                                  <path
                                    d='M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z'
                                    fill='currentColor'
                                  />
                                </svg>
                              </span>
                              {/*end::Svg Icon*/}
                              <input
                                className='form-control form-control-solid fs-7 ps-12 fw-bolder kt_daterangepicker_3'
                                placeholder='Pick date rage'
                                id='kt_daterangepicker_3'
                              />
                            </div>
                          </div>
                          <div className='col-md-5 '>
                            <div className='form-check form-check-custom form-check-solid form-check-sm ms-4'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                defaultValue
                                id='flexRadioLg'
                              />
                              <label
                                className='form-check-label text-dark ms-4'
                                htmlFor='flexRadioLg'
                              >
                                <b>Shipping Mode</b>
                                <br />
                                <small>
                                  Shipping mode will be same for all shipments
                                </small>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className='separator separator-dashed my-4' />
                        <div className='mt-5'>
                          <div className='row'>
                            <div className='col-md-4'>
                              {/*begin::Option*/}
                              <input
                                type='radio'
                                className='btn-check'
                                name='radio_buttons_2'
                                defaultValue='apps'
                                defaultChecked='checked'
                                id='kt_radio_buttons_2_option_1'
                              />
                              <label
                                className='btn btn-outline btn-outline-dashed btn-outline-light p-7 d-flex align-items-center mb-5'
                                htmlFor='kt_radio_buttons_2_option_1'
                              >
                                {/*begin::Svg Icon | path: icons/duotune/coding/cod001.svg*/}
                                <span className='svg-icon svg-icon-4x me-4'>
                                  <img
                                    src='/media/box.png'
                                    alt=''
                                    className='w-60px'
                                  />
                                </span>
                                {/*end::Svg Icon*/}
                                <span className='d-block fw-bold text-start'>
                                  <span className='text-dark fw-bolder d-block fs-3'>
                                    Small Parcel Delivery (SPD)
                                  </span>
                                </span>
                              </label>
                              {/*end::Option*/}
                            </div>
                            <div className='col-md-4'>
                              {/*begin::Option*/}
                              <input
                                type='radio'
                                className='btn-check'
                                name='radio_buttons_2'
                                defaultValue='sms'
                                id='kt_radio_buttons_2_option_2'
                              />
                              <label
                                className='btn btn-outline btn-outline-dashed btn-outline-light p-7 d-flex align-items-center'
                                htmlFor='kt_radio_buttons_2_option_2'
                              >
                                {/*begin::Svg Icon | path: icons/duotune/communication/com003.svg*/}
                                <span className='svg-icon svg-icon-4x me-4'>
                                  <img
                                    src='/media/boxes.png'
                                    alt=''
                                    className='w-60px'
                                  />
                                </span>
                                {/*end::Svg Icon*/}
                                <span className='d-block fw-bold text-start'>
                                  <span className='text-dark fw-bolder d-block fs-3'>
                                    Less then truckload (LTL)
                                  </span>
                                </span>
                              </label>
                              {/*end::Option*/}
                            </div>
                          </div>
                        </div>
                        <div className='separator separator-dashed my-4' />
                        <div className='my-10'>
                          <div className='row g-6'>
                            <div className='col-md-12'>
                              <h5>Number of shipments : 2</h5>
                            </div>
                            <div className='col-md-4'>
                              <div className='card border '>
                                <div className='card-header  min-h-50px'>
                                  <h3 className='card-title align-items-start flex-column'>
                                    <span className='card-label fw-bolder fs-5 mb-0'>
                                      Shipment #1
                                    </span>
                                  </h3>
                                </div>
                                <div className='card-body p-5 fs-7 text-dark'>
                                  <p className='mb-0'>
                                    <b>Ship to:</b> TPA2 - 1760 County Line Rd
                                    3381 - 1808- Lakeland, FL - United States{' '}
                                  </p>
                                  <div className='border-top border-top-dashed my-3'></div>
                                  <div className='d-flex justify-content-between'>
                                    <div className>
                                      <span>
                                        <b>Shipment Contents</b>
                                      </span>
                                      <br />
                                      <span>
                                        Boxes : <b>3</b>
                                      </span>{' '}
                                      /
                                      <span>
                                        SKUs : <b>1</b>
                                      </span>
                                      <br />
                                      <span>
                                        Units : <b>36</b>
                                      </span>{' '}
                                      /
                                      <span>
                                        Weight : <b>66 lb</b>
                                      </span>
                                    </div>
                                    <div>
                                      <img
                                        src='https://www.apolloclinic.com/assets/images/doctors/7659_dummy-placeholder-image-400x400.jpg'
                                        style={{
                                          width: '50px',
                                          height: '50px',
                                          objectFit: 'contain'
                                        }}
                                        className
                                      />
                                    </div>
                                  </div>
                                  <div className='border-top border-top-dashed my-3'></div>
                                  <span>
                                    Estimated carrier charges:
                                    <b>$31.22</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              <div className='card border '>
                                <div className='card-header  min-h-50px'>
                                  <h3 className='card-title align-items-start flex-column'>
                                    <span className='card-label fw-bolder fs-5 mb-0'>
                                      Shipment #2
                                    </span>
                                  </h3>
                                </div>
                                <div className='card-body p-5 fs-7 text-dark'>
                                  <p className='mb-0'>
                                    <b>Ship to:</b> TPA2 - 1760 County Line Rd
                                    3381 - 1808- Lakeland, FL - United States{' '}
                                  </p>
                                  <div className='border-top border-top-dashed my-3'></div>
                                  <div className='d-flex justify-content-between'>
                                    <div className>
                                      <span>
                                        <b>Shipment Contents</b>
                                      </span>
                                      <br />
                                      <span>
                                        Boxes : <b>3</b>
                                      </span>{' '}
                                      /
                                      <span>
                                        SKUs : <b>1</b>
                                      </span>
                                      <br />
                                      <span>
                                        Units : <b>36</b>
                                      </span>{' '}
                                      /
                                      <span>
                                        Weight : <b>66 lb</b>
                                      </span>
                                    </div>
                                    <div>
                                      <img
                                        src='https://www.apolloclinic.com/assets/images/doctors/7659_dummy-placeholder-image-400x400.jpg'
                                        style={{
                                          width: '50px',
                                          height: '50px',
                                          objectFit: 'contain'
                                        }}
                                        className
                                      />
                                    </div>
                                  </div>
                                  <div className='border-top border-top-dashed my-3'></div>
                                  <span>
                                    Estimated carrier charges:
                                    <b>$31.22</b>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='separator separator-dashed my-4' />
                        <div className='mt-7'>
                          <div data-kt-buttons='true'>
                            <div className='row'>
                              <div className='col-md-12 mb-5  '>
                                <h5> Select Shipping Carrier</h5>
                              </div>
                              <div className='col-md-4'>
                                {/*begin::Radio group*/}
                                {/*begin::Radio button*/}
                                <label className='btn btn-outline btn-outline-dashed d-flex flex-stack text-start p-6 mb-5'>
                                  {/*end::Description*/}
                                  <div className='d-flex align-items-center me-2'>
                                    {/*begin::Radio*/}
                                    <div className='form-check form-check-custom form-check-solid form-check-primary me-6'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        name='plan'
                                        defaultValue='startup'
                                      />
                                    </div>
                                    {/*end::Radio*/}
                                    {/*begin::Info*/}
                                    <div className='flex-grow-1'>
                                      <h2 className='d-flex align-items-center fs-3 fw-bolder flex-wrap'>
                                        $55.00
                                      </h2>
                                      <div className='fw-bold opacity-50'>
                                        UPS (Amazon partnered carrier)
                                      </div>
                                    </div>
                                    {/*end::Info*/}
                                  </div>
                                  {/*end::Description*/}
                                </label>
                                {/*end::Radio button*/}
                              </div>
                              <div className='col-md-4'>
                                {/*begin::Radio button*/}
                                <label className='btn btn-outline btn-outline-dashed d-flex flex-stack text-start p-6 mb-5 active'>
                                  {/*end::Description*/}
                                  <div className='d-flex align-items-center me-2'>
                                    {/*begin::Radio*/}
                                    <div className='form-check form-check-custom form-check-solid form-check-primary me-6'>
                                      <input
                                        className='form-check-input'
                                        type='radio'
                                        name='plan'
                                        defaultChecked='checked'
                                        defaultValue='advanced'
                                      />
                                    </div>
                                    {/*end::Radio*/}
                                    {/*begin::Info*/}
                                    <div className='flex-grow-1'>
                                      <div className>
                                        <select
                                          className='form-select form-select-sm form-select-solid bg-transparent border-0 py-1 px-0'
                                          name
                                          id
                                        >
                                          <option value>Select Carrier</option>
                                        </select>
                                      </div>
                                      <div className='fw-bold opacity-50'>
                                        Non Amazon partnered carrier
                                      </div>
                                    </div>
                                    {/*end::Info*/}
                                  </div>
                                  {/*end::Description*/}
                                </label>
                                {/*end::Radio button*/}
                              </div>
                            </div>
                          </div>
                          <div className='separator separator-dashed my-2 mt-4' />
                          <div className=' mt-4 row align-items-center '>
                            <div className='col-md-7 '>
                              <span className='fs-7 text-dark'>
                                <b className=' fw-boldest'>Ready to continue</b>
                              </span>
                              <br />
                              <span className='fs-7 text-dark'>
                                Before we generate the shipping labels for you,
                                take a moment to review <br />
                                the details and check that all is correct.
                              </span>
                            </div>
                            <div className='col-md-5 '>
                              <div className='d-flex justify-content-between text-dark mb-1'>
                                <span className='fs-7'>
                                  Total prep and labeling fees:
                                </span>
                                <span>
                                  <b className='fw-boldest'>$0.00</b>
                                </span>
                              </div>
                              <div className='d-flex justify-content-between text-dark mb-1'>
                                <span className='fs-7'>
                                  Total placement fees:
                                </span>
                                <span>
                                  <b className='fw-boldest'>$0.00</b>
                                </span>
                              </div>
                              <div className='d-flex justify-content-between text-dark mb-1'>
                                <span className='fs-7'>
                                  Total estimated shipping fees:
                                </span>
                                <span>
                                  <b className='fw-boldest'>$55.79</b>
                                </span>
                              </div>
                              <div className='d-flex justify-content-between mt-3 text-dark'>
                                <span className='fs-7'>
                                  Total estimated prep, labeling, placement, and
                                  shipping fees:
                                </span>
                                <span>
                                  <b className='fw-boldest'>$55.79</b>
                                </span>
                              </div>
                              <button className='btn btn-dark mt-4 fs-7'>
                                Accept charges and confirm shipping
                              </button>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>
                        {/* <div class="separator separator-dashed"></div> */}
                      </div>
                      {/*end::Section*/}
                    </div>
                  )}

                  <div className='separator separator-dashed' />
                </div>
                {/*begin::Section*/}
                <div className='m-0'>
                  {/*begin::Heading*/}
                  <div className='d-flex align-items-center py-3 toggle mb-0'>
                    <div
                      className='btn btn-sm btn-icon mw-20px btn-active-color-primary me-5'
                      onClick={() => setExpand3(!expand3)}
                    >
                      {!expand3 ? (
                        <div className='svg-icon toggle-off svg-icon-danger svg-icon-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.3'
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              fill='black'
                            />
                            <rect
                              x='6.0104'
                              y='10.9247'
                              width={12}
                              height={2}
                              rx={1}
                              fill='black'
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className='svg-icon toggle-off  svg-icon-1'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={24}
                            height={24}
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <rect
                              opacity='0.3'
                              x={2}
                              y={2}
                              width={20}
                              height={20}
                              rx={5}
                              fill='black'
                            />
                            <rect
                              x='10.8891'
                              y='17.8033'
                              width={12}
                              height={2}
                              rx={1}
                              transform='rotate(-90 10.8891 17.8033)'
                              fill='black'
                            />
                            <rect
                              x='6.01041'
                              y='10.9247'
                              width={12}
                              height={2}
                              rx={1}
                              fill='black'
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h4 className='text-gray-700 fw-bolder cursor-pointer mb-0'>
                      Step 3 : Shipping Labels
                    </h4>
                  </div>
                  {/*end::Heading*/}
                  {/*begin::Body*/}
                  {!expand3 && (
                    <div className='fs-6 ms-1'>
                      <div className='mb-4 text-gray-600 fw-bold fs-6 ps-10 '>
                        <div className=' row mt-5'>
                          <div className='col-md-12'>
                            <p className='fs-7 text-grey-500'>
                              Select a paper type that is compatible with your
                              printer format. Since each box label is unique. be
                              sure to print all box labels. Do not photocopy,
                              reuse, or modify labels for use on additional
                              boxes. A box ID label is required even if the box
                              contains a single sellable unit. Boxes containing
                              multiple standard-size items must not exceed 25.00
                              inches on any side. <a href>Learn More</a>
                            </p>
                          </div>
                          <div className='separator separator-dashed my-2' />
                          <div className=' row'>
                            <div className='col-md-12'>
                              <div className='table-responsive'>
                                <table className='table table-row-dashed fs-7 table-row-gray-300 align-middle gx-4 gy-4'>
                                  <thead>
                                    <tr className='text-start text-gray-800 fw-boldest fs-7 '>
                                      <th># of boxes</th>
                                      <th>Paper Type</th>
                                      <th>Paper Size</th>
                                    </tr>
                                  </thead>
                                  <tbody className='fw-bold text-gray-800 '>
                                    <tr>
                                      <td>12</td>
                                      <td>
                                        <select
                                          name
                                          id
                                          className='form-select form-select-solid form-select-sm w-250px fs-7'
                                        >
                                          <option value>
                                            Blank Rectangle Label
                                          </option>
                                          <option value>
                                            Thermal Printing Paper
                                          </option>
                                        </select>
                                      </td>
                                      <td>4 x 6 inches (102 x 152 mm)</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className='separator separator-dashed my-4' />
                            <div className='col-md-12 mb-4'>
                              <h5>
                                <span>Ship Date</span>
                                <br />
                                <small className='mt-2 d-block text-gray-700'>
                                  Ship date is the date you expect to hand your
                                  inventory to the carrier. This date helps us
                                  prepare to receive your inventory. This date
                                  can be changed after you have confirmed
                                  shipping.
                                </small>
                              </h5>
                            </div>
                            <div className='col-md-3'>
                              <div className='position-relative my-1'>
                                {/*begin::Svg Icon | path: icons/duotune/general/gen021.svg*/}
                                <span className='svg-icon svg-icon-2 position-absolute top-50 translate-middle-y ms-4'>
                                  <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width={24}
                                    height={24}
                                    viewBox='0 0 24 24'
                                    fill='none'
                                  >
                                    <path
                                      opacity='0.3'
                                      d='M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z'
                                      fill='currentColor'
                                    />
                                    <path
                                      d='M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z'
                                      fill='currentColor'
                                    />
                                    <path
                                      d='M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z'
                                      fill='currentColor'
                                    />
                                  </svg>
                                </span>
                                {/*end::Svg Icon*/}
                                <input
                                  className='form-control form-control-solid fs-7 ps-12 fw-bolder kt_daterangepicker_3'
                                  placeholder='Pick date rage'
                                  id='kt_daterangepicker_3'
                                />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <button
                                type='button'
                                className='btn btn-dark fs-7 ms-2 '
                                name
                                value
                              >
                                Print Box Label
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/*end::Section*/}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*end::Container*/}
    </div>
  );
}
