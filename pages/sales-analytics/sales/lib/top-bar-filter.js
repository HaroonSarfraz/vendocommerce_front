import { Select } from "antd";
import moment from "moment";

export default function TopBarFilter(filter, setFilter, type) {
  return <div className="row gx-5 gx-xl-5 fadeInRight">
    <div className="col-xl-12 mb-5 mb-xl-5">
      <div className="card card-flush h-xl-100">
        <div className="card-body px-4 py-4">
          <div className="d-flex flex-wrap gap-3">
            <div>
              <Select
                defaultValue="2022"
                size="large"
                style={{ width: 100 }}
                value={filter?.year || null}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    year: e
                  });
                }}
                options={
                  [...Array(4)].map((_, i) => {
                    const year = parseInt(moment(new Date()).format("YYYY")) + i - [...Array(4)]?.length + 1
                    return { value: year, label: year }
                  })
                } />
            </div>
            <div>
              <Select
                style={{ width: 300 }}
                size="large"
                placeholder={`Select ${type}`}
                mode="multiple"
                maxTagCount="responsive"
                value={filter?.[type?.toLowerCase()] || null}
                onChange={(e) => {
                  setFilter({
                    ...filter,
                    [type.toLowerCase()]: e
                  });
                }}
                options={type === 'Week' ? [...Array(53)].map((_, i) => {
                  return { value: (i + 1), label: `WK${i.toString()?.length === 1 ? (0 + i + 1) : i + 1}` }
                }) : moment.months()?.map((d, i) => { return { label: d, value: i + 1 } })}
                allowClear />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
