import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TvSvg } from "@/src/assets";
import { getAmazonAdvertisingCredentialsList } from "@/src/services/brands.services";
import { selectAmazonAdvertisingCredentialsList } from "@/src/store/slice/brands.slice";
import { deleteAmazonAdvertisingCredentialsRequest } from "@/src/api/brands.api";

import CredentialsTable from "./credentials-table";
import Loading from "@/src/components/loading";

const clientID = process.env.NEXT_PUBLIC_ADVERTISING_CLIENT_ID;
const returnURL = process.env.NEXT_PUBLIC_ADVERTISING_RETURN_URL;

export default function AdvertisingCredentials({ brand }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  const amazonSpApiCredentialsList = useSelector(
    selectAmazonAdvertisingCredentialsList
  );

  useEffect(() => {
    // dispatch(getAmazonAdvertisingCredentialsList(brand.id));
  }, []);

  useEffect(() => {
    if (amazonSpApiCredentialsList) {
      setList(amazonSpApiCredentialsList.data);
      setLoading(false);
    }
  }, [amazonSpApiCredentialsList]);

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

  const deleteAmazonSpApiCredentials = (id) => {
    deleteAmazonAdvertisingCredentialsRequest(brand.id, id)
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAmazonAdvertisingCredentialsList(brand.id));
          message.success("User has been Removed from Brand Successfully");
        } else {
          message.error("Unable to remove user");
        }
      })
      .catch((err) => message.error(err?.response?.message));
  };

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
                  <h4 className="mx-5 mt-1">Amazon Advertising Credentials</h4>
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
              <div className="row mt-4 pt-4 border-top">
                <h4 className="mx-5 mt-6">Amazon Advertising Credentials List</h4>
              </div>
              <div className="mt-2">
                {loading ? (
                  <Loading />
                ) : (
                  <CredentialsTable list={list} deleteAction={deleteAmazonSpApiCredentials} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
