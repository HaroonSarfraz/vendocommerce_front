import {
  currencyFormat,
  numberFormat,
  percentageFormat,
} from "@/src/helpers/formatting.helpers";
import Details from "../../Details";

export default function SkuTable({ loading, details }) {
  return (
    <div className="row gx-5 gx-xl-5">
      <div className="col-xl-12 mb-5 mb-xl-5">
        <div className="card card-flush h-xl-100">
          <div className="card-body py-3 pt-5">
            <div className="row g-3">
              <Details
                loading={loading}
                data={[
                  {
                    title: "Sum of Units Ordered",
                    value: numberFormat(details?.totalUnitOrdered),
                  },
                  {
                    title: "Sum of Ordered Product Sales",
                    value: currencyFormat(details?.totalOrderedProductSales),
                  },
                  {
                    title: "Average of Buy Box",
                    value: percentageFormat(details?.avgBuyBox),
                  },
                  {
                    title: "Sum of Unit Session",
                    value: percentageFormat(details?.avgUnitSession),
                  },
                  {
                    title: "Sum of Sessions",
                    value: numberFormat(details?.totalSession),
                  },
                  {
                    title: "Sum of Page Views",
                    value: numberFormat(details?.totalPageViews),
                  },
                  {
                    title: "Sum of Session Percentage",
                    value: percentageFormat(details?.totalSessionPercentage),
                  },
                  {
                    title: "Sum of Total Order Items",
                    value: numberFormat(details?.totalOrderItems),
                  },
                  {
                    title: "Sum of Page Views Percentage",
                    value: percentageFormat(details?.avgPageViewPercentage),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
