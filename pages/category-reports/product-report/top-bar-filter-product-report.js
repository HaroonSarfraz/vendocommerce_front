import { selectCategoryList } from "@/src/store/slice/categoryList.slice";
import { Input, Select } from "antd";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function TopBarFilter(filter, setFilter, type) {
  const CategoryListRes = useSelector(selectCategoryList);

  return (
    <div className="row gx-5 gx-xl-5 fadeInRight">
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
                      year: e,
                    });
                  }}
                  options={[...Array(4)].map((_, i) => {
                    const year =
                      parseInt(moment(new Date()).format("YYYY")) +
                      i -
                      [...Array(4)]?.length +
                      1;
                    return { value: year, label: year };
                  })}
                />
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
                      [type.toLowerCase()]: e,
                    });
                  }}
                  options={
                    type === "Week"
                      ? [...Array(53)].map((_, i) => {
                          return {
                            value: i + 1,
                            label: `WK${
                              i.toString()?.length === 1 ? 0 + i + 1 : i + 1
                            }`,
                          };
                        })
                      : moment.months()?.map((d, i) => {
                          return { label: d, value: i };
                        })
                  }
                  allowClear
                />
              </div>
              <div className="position-relative">
                <Input
                  placeholder="Search by ASIN"
                  style={{
                    width: 250,
                  }}
                  value={filter.asin || null}
                  onChange={(e) =>
                    setFilter((s) => ({ ...s, asin: e.target.value }))
                  }
                  onPressEnter={() => {
                    getList();
                  }}
                  size="large"
                />
              </div>
              <div className="position-relative">
                <Select
                  disabled={CategoryListRes?.data.length === 0}
                  mode="multiple"
                  defaultValue="All"
                  placeholder="Category"
                  size="large"
                  style={{ width: 200 }}
                  value={filter?.["category"] || null}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      ["category"]: e,
                    });
                  }}
                  options={[
                    {
                      value: null,
                      label: "All",
                    },
                    ...(CategoryListRes?.data?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })) || []),
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
