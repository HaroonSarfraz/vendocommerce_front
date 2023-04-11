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
                    value: 0,
                  },
                  {
                    title: "Spend",
                    value: 0,
                  },
                  {
                    title: "ACoS",
                    value: 0,
                  },
                  {
                    title: "CPO",
                    value: 0,
                  },
                  {
                    title: "Impression",
                    value: 0,
                  },
                  {
                    title: "Clicks",
                    value: 0,
                  },
                  {
                    title: "Unit Orders",
                    value: 0,
                  },
                  {
                    title: "CPC",
                    value: 0,
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
