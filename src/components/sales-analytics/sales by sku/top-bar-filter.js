import { Input } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export default function TopBarFilterSku() {
  dayjs.extend(customParseFormat);

  const { RangePicker } = DatePicker;

  const dateFormat = 'YYYY/MM/DD';

  return (
    <div class='row gx-5 gx-xl-5'>
      <div class='col-xl-12 mb-5 mb-xl-5'>
        <div class='card card-flush h-xl-100'>
          <div class='card-body px-4 py-4'>
            <div class='d-flex flex-wrap gap-4 '>
              <div class='position-relative my-1'>
                <Input
                  placeholder='Search by Title, ASIN'
                  class='ant-input ant-input-lg css-dev-only-do-not-override-l52ttj'
                  type='text'
                  value=''
                  style={{ width: '250px' }}
                />
              </div>
              <div class='position-relative my-1'>
                <div class='ant-picker ant-picker-range ant-picker-large css-dev-only-do-not-override-l52ttj'>
                  <div class='ant-picker-input ant-picker-input-active'>
                    <Space  size={12}>
                      <RangePicker
                        defaultValue={[
                          dayjs('2023/03/24', dateFormat),
                          dayjs('2023/03/31', dateFormat)
                        ]}
                        format={dateFormat}
                      />
                    </Space>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
