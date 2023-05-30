import { selectCategoryList } from "@/src/store/slice/categoryList.slice";
import { Input, Select } from "antd";
import { useSelector } from "react-redux";

export default function TopBarFilter(filter, setFilter) {
  const CategoryListRes = useSelector(selectCategoryList);

  return (
    <div className="row gx-5 gx-xl-5 fadeInRight">
      <div className="col-xl-12 mb-5 mb-xl-5">
        <div className="card card-flush h-xl-100">
          <div className="card-body px-4 py-4">
            <div className="d-flex flex-wrap gap-3">
              <div>
                <Select
                  defaultValue="All"
                  placeholder="Category"
                  size="large"
                  style={{ width: 200 }}
                  value={filter?.["search[category]"] || null}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      ["search[category]"]: e,
                    });
                  }}
                  options={[
                    {
                      value: "",
                      label: "All",
                    },
                    ...(CategoryListRes?.data?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })) || []),
                  ]}
                />
              </div>
              <div className="position-relative">
                <Input
                  placeholder="ASIN"
                  style={{
                    width: 250,
                  }}
                  value={filter?.["search[asin]"] || null}
                  onChange={(e) =>
                    setFilter({ ...filter, ["search[asin]"]: e.target.value })
                  }
                  onPressEnter={() => {
                    getList();
                  }}
                  size="large"
                />
              </div>
              <div className="position-relative">
                <Input
                  placeholder="SKU"
                  style={{
                    width: 250,
                  }}
                  value={filter?.["search[sku]"] || null}
                  onChange={(e) =>
                    setFilter({ ...filter, ["search[sku]"]: e.target.value })
                  }
                  onPressEnter={() => {
                    getList();
                  }}
                  size="large"
                />
              </div>
              <div className="position-relative">
                <Input
                  placeholder="Product Title"
                  style={{
                    width: 250,
                  }}
                  value={filter?.["search[product_title]"] || null}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      ["search[product_title]"]: e.target.value,
                    })
                  }
                  onPressEnter={() => {
                    getList();
                  }}
                  size="large"
                />
              </div>
              <div className="position-relative">
                <Select
                  defaultValue="All"
                  placeholder="Product Status"
                  size="large"
                  style={{ width: 200 }}
                  value={filter?.["search[product_status]"] || null}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      ["search[product_status]"]: e,
                    });
                  }}
                  options={[
                    {
                      value: "Active",
                      label: "Active",
                    },
                    { value: "inactive", label: "inactive" },
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
