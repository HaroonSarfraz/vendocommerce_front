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
                    title: "Units Ordered",
                    value: numberFormat(details?.totalUnitOrdered),
                  },
                  {
                    title: "Ordered Revenue",
                    value: currencyFormat(details?.totalOrderedProductSales),
                  },
                  {
                    title: "Buy Box % (avg)",
                    value: percentageFormat(details?.avgBuyBox),
                  },
                  {
                    title: "Conversion Rate",
                    value: percentageFormat(details?.avgUnitSession),
                  },
                  {
                    title: "Total Sessions",
                    value: numberFormat(details?.totalSession),
                  },
                  {
                    title: "Total Page Views",
                    value: numberFormat(details?.totalPageViews),
                  },
                  {
                    title: "Session Percentage",
                    value: percentageFormat(details?.totalSessionPercentage),
                  },
                  {
                    title: "Total Orders",
                    value: numberFormat(details?.totalOrderItems),
                  },
                  {
                    title: "Page View %",
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
