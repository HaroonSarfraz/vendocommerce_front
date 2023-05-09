import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { defaultDateRange } from "@/src/config";
import dayjs from 'dayjs';
import {
  getSalesBySkuDetails,
  getSalesBySkuDetailsList
} from '@/src/services/salesBySku.services';
import {
  SkuTable,
  SalesBySkuTable,
  TopBarFilterSku
} from '@/src/components/sales-analytics/sku';
import { selectSalesBySkuDetails, selectSalesBySkuDetailsList } from '@/src/store/slice/salesBySku.slice';

const DashboardLayout = dynamic(() => import('@/src/layouts/DashboardLayout'), {
  ssr: false
});

export default function SalesBySku() {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState(defaultDateRange());
  const [searchText, setSearchText] = useState('');

  const salesBySKUDetails = useSelector(selectSalesBySkuDetails);
  const salesSKUDetailsList = useSelector(selectSalesBySkuDetailsList);

  const getList = (e) => {
    setDetailsLoading(true);
    setLoading(true);
    // dispatch(
    //   getSalesBySkuDetailsList({
    //     start_date: moment(dateFilter[0]['$d']).format('MM-DD-YYYY'),
    //     end_date: moment(dateFilter[1]['$d']).format('MM-DD-YYYY'),
    //     search_text: e || searchText || ''
    //   })
    // );
    dispatch(
      getSalesBySkuDetails({
        start_date: moment(dateFilter[0]['$d']).format('YYYY-MM-DD'),
        end_date: moment(dateFilter[1]['$d']).format('YYYY-MM-DD'),
        search_text: e || searchText || ''
      })
    );
  };

  useEffect(() => {
    if (dateFilter && dateFilter?.length === 2) {
      setLoading(true);
      getList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter]);

  useEffect(() => {
    if (salesBySKUDetails?.status) {
      setDetails(salesBySKUDetails?.data);
      setDetailsLoading(false);
    } else if (salesBySKUDetails?.status === false) {
      setDetailsLoading(false);
    }
  }, [salesBySKUDetails]);

  useEffect(() => {
    if (salesSKUDetailsList?.status) {
      setList(salesSKUDetailsList?.data || []);
      setLoading(false);
    } else if (salesSKUDetailsList?.status === false) {
      setLoading(false);
    }
  }, [salesSKUDetailsList]);

  return (
    <DashboardLayout>
      <div
        className='content d-flex flex-column flex-column-fluid'
        id='kt_content'
      >
        <div className='container-fluid' id='kt_content_container'>
          <TopBarFilterSku
            setDateFilter={(e) => setDateFilter(e)}
            setSearchText={(e) => setSearchText(e.target.value)}
            searchText={searchText}
            dateFilter={dateFilter}
            getList={(e) => getList(e)}
          />
          <SkuTable loading={detailsLoading} details={details} />
          <SalesBySkuTable loading={loading} list={list} />
        </div>
      </div>
    </DashboardLayout>
  );
}
