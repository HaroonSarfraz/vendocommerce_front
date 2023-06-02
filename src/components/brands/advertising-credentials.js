import { TvSvg } from "@/src/assets";
import { useEffect } from "react";

export default function AdvertisingCredentials({ brand }) {
  var clientID = process.env.NEXT_PUBLIC_ADVERTISING_CLIENT_ID;
  var returnURL = process.env.NEXT_PUBLIC_ADVERTISING_RETURN_URL;

  useEffect(() => {
    window.onAmazonLoginReady = function () {
      amazon.Login.setClientId(clientID);
    };

    (function (d) {
      var a = d.createElement("script");
      a.type = "text/javascript";
      a.async = true;
      a.id = "amazon-login-sdk";
      a.src = "https://assets.loginwithamazon.com/sdk/na/login1.js";
      d.getElementById("amazon-root").appendChild(a);
    })(document);

    document.getElementById("LoginWithAmazon").onclick = function () {
      var options = {};
      options.scope = "advertising::campaign_management";
      options.response_type = "code";
      amazon.Login.authorize(options, returnURL);
      return false;
    };
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="card mb-7">
            <div className="card-body">
              <div className="row">
                <div id="amazon-root"></div>

                <div className="col-12 d-flex flex-row mb-5">
                  <TvSvg />
                  <h4 className="mx-5 mt-1">Amazon SP API Credentials</h4>
                </div>
              </div>
              <div className="row">
                <div id="amazon-root"></div>
                <div className="col-12 d-flex flex-row mb-5">
                  <img
                    border="0"
                    alt="Login with Amazon"
                    src="https://images-na.ssl-images-amazon.com/images/G/01/lwa/btnLWA_gold_156x32.png"
                    width="156"
                    height="32"
                    className="cursor-pointer"
                    id="LoginWithAmazon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
