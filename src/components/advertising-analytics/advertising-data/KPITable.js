import { formatCurrency, formatNumber, formatPercentage } from "@/src/helpers/formatting.helpers";
import Details from "./Details";

export default function KPITable({ heading }) {
  return (
    <div className="row gx-5 gx-xl-5">
      <div className="col-xl-12 mb-5 mb-xl-5 h-200px">
        <div className="card card-flush h-xl-100">
          <div className="card-body py-3 pt-5">
            <div className="row g-3">
              <p className="fs-4 fw-boldest">{heading}</p>
              <Details
                loading={false}
                data={[
                  {
                    title: "Revenue",
                    value: formatCurrency(0),
                  },
                  {
                    title: "Spend",
                    value: formatCurrency(0),
                  },
                  {
                    title: "ACoS",
                    value: formatPercentage(0),
                  },
                  {
                    title: "CPO",
                    value: formatCurrency(0),
                  },
                  {
                    title: "Impression",
                    value: formatNumber(0),
                  },
                  {
                    title: "Clicks",
                    value: formatNumber(0),
                  },
                  {
                    title: "Unit Orders",
                    value: formatNumber(0),
                  },
                  {
                    title: "CPC",
                    value: formatCurrency(0),
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
