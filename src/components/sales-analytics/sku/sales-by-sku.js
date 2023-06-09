// import Image from 'next/image';
import { Tooltip } from 'antd';
import Loading from '../../loading';
import ASINTable from '../../table';
import NoData from '../../no-data';
import Image from 'rc-image';

export default function SalesBySkuTable({ loading, list }) {
  console.log(list);
  const columns = [
    {
      title: 'Row Labels',
      width: 500,
      align: 'left',
      render: (text) => {
        return (
          <div className='d-flex align-items-center position-relative'>
            <div className='symbol symbol-75px me-5'>
              <Image
                src={text?.product_image || '/images/no-product-image.png'}
                onError={(ev) =>
                  (ev.target.src = '/images/no-product-image.png')
                }
                loading='lazy'
                style={{ objectFit: 'contain' }}
                alt='product_image'
                width={50}
                height={50}
              />
            </div>
            <div className='d-flex justify-content-start flex-column'>
              <span className='text-dark fw-boldest  fs-6 one mb-1'>
                <Tooltip row={2} rule title={text?.title}>
                  {text?.title || ''}
                </Tooltip>
              </span>
              <span className='text-muted font-weight-bold  fs-12 d-flex mt-1'>
                <div className='text-dark'>
                  <b className='text-dark fw-boldest'>Child ASIN:</b>{' '}
                  <a
                    className
                    href={`https://amazon.com/dp/${text?.child_asin}`}
                    title='View on Amazon'
                    target='_blank'
                  >
                    {text?.child_asin}
                  </a>
                </div>
              </span>
              <span className='text-muted font-weight-bold  fs-12 d-flex mt-1'>
                <div className='text-dark'>
                  <b className='text-dark fw-boldest'>Parent ASIN:</b>{' '}
                  {text?.parent_asin}
                </div>
              </span>
              <span className='text-muted font-weight-bold  fs-12 d-flex mt-1'>
                <div className='text-dark'>
                  <b className='text-dark fw-boldest'>SKU:</b> {text?.sku}
                </div>
              </span>
            </div>
          </div>
        );
      }
    },
    {
      title: 'Sum Of Units Ordered',
      width: 175,
      align: 'left',
      ellipsis: true,
      render: (text) => {
        return <span>{text?.total_ordered_units || 0}</span>;
      }
    },
    {
      title: 'Sum Of Ordered Product Sales',
      width: 225,
      align: 'left',
      ellipsis: true,
      render: (text) => {
        return <span>${text?.total_ordered_product_sales || 0}</span>;
      }
    },
    {
      title: 'Average Of Buy Box',
      width: 150,
      align: 'left',
      ellipsis: true,
      render: (text) => {
        return <span>{text?.avg_buy_box_percentage || '0%'}</span>;
      }
    },
    {
      title: 'Sum Of Unit Session',
      width: 150,
      align: 'left',
      ellipsis: true,
      render: (text) => {
        return <span>{text?.avg_unit_session_percentage || '0%'}</span>;
      }
    },
    {
      title: 'Sum Of Sessions',
      width: 150,
      align: 'left',
      ellipsis: true,
      render: (text) => {
        return <span>{text?.total_session || 0}</span>;
      }
    },
    {
      title: 'Sum Of Page Views',
      width: 175,
      align: 'left',
      ellipsis: true,
      render: (text) => {
        return <span>{text?.total_page_views || 0}</span>;
      }
    },
    {
      title: 'Sum Of Session Percentage',
      width: 200,
      align: 'left',
      ellipsis: true,
      render: (text) => {
        return <span>{text?.avg_session_percentage || '0%'}</span>;
      }
    },
    {
      title: 'Sum Of Total Order Items',
      width: 200,
      align: 'left',
      ellipsis: true,
      render: (text) => {
        return <span>{text?.total_order_items || '0'}</span>;
      }
    },
    {
      title: 'Sum Of Page Views Percentage',
      width: 225,
      align: 'left',
      ellipsis: true,
      render: (text) => {
        return <span>{text?.avg_page_view_percentage || '0%'}</span>;
      }
    }
  ];
  return (
    <div className='row'>
      <div className='col-lg-12'>
        <div className='card'>
          <div className='card-header'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bolder fs-3 mb-1'>
                Sales by SKU
              </span>
            </h3>
            <div className='card-toolbar'>
              <div className='dropdown'>
                <button
                  className='btn btn-light-danger fs-7 px-10 dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton1'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Export
                </button>
                <ul
                  className='dropdown-menu'
                  aria-labelledby='dropdownMenuButton1'
                >
                  <li>
                    <a className='dropdown-item' href='#'>
                      Export to csv
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#'>
                      Export to xlsx
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='card-body pt-0 px-4' style={{}}>
            {loading ? (
              <Loading />
            ) : list?.length != 0 ? (
              <ASINTable
                columns={columns}
                dataSource={list}
                rowKey='key'
                loading={loading}
                pagination={false}
                scroll={{
                  x:
                    columns?.map((d) => d.width).reduce((a, b) => a + b, 0) +
                    300
                }}
              />
            ) : (
              <NoData />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
