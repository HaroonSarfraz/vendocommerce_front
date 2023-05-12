import { Input, Select } from 'antd';

export default function TopBarFilter(filter, setFilter) {
  return (
    <div className='row gx-5 gx-xl-5 fadeInRight'>
      <div className='col-xl-12 mb-5 mb-xl-5'>
        <div className='card card-flush h-xl-100'>
          <div className='card-body px-4 py-4'>
            <div className='d-flex flex-wrap gap-3'>
              <div>
                <Select
                  defaultValue='All'
                  placeholder='Category'
                  size='large'
                  style={{ width: 200 }}
                  value={filter?.category || null}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      category: e,
                    });
                  }}
                  options={[{ value: 'All', label: 'All' }]}
                />
              </div>
              <div className='position-relative'>
                <Input
                  placeholder='ASIN'
                  style={{
                    width: 250,
                  }}
                  value={filter.asin || null}
                  onChange={(e) => setFilter({ ...filter, asin: e.target.value })}
                  onPressEnter={() => {
                    getList();
                  }}
                  size='large'
                />
              </div>
              <div className='position-relative'>
                <Input
                  placeholder='SKU'
                  style={{
                    width: 250,
                  }}
                  value={filter.sku || null}
                  onChange={(e) => setFilter({ ...filter, sku: e.target.value })}
                  onPressEnter={() => {
                    getList();
                  }}
                  size='large'
                />
              </div>
              <div className='position-relative'>
                <Input
                  placeholder='Product Title'
                  style={{
                    width: 250,
                  }}
                  value={filter.title || null}
                  onChange={(e) => setFilter({ ...filter, title: e.target.value })}
                  onPressEnter={() => {
                    getList();
                  }}
                  size='large'
                />
              </div>
              <div className='position-relative'>
                <Input
                  placeholder='Product Status'
                  style={{
                    width: 250,
                  }}
                  value={filter.status || null}
                  onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                  onPressEnter={() => {
                    getList();
                  }}
                  size='large'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
