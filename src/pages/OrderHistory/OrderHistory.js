import './OrderHistory.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import OrderHistoryMaterialTable from '../../components/MaterialTables/OrderHistoryMaterialTable/OrderHistoryMaterialTable';

function OrderHistory() {

  return (
    <div className='container'>
      <Header />
      <OrderHistoryMaterialTable />
      <Footer />
    </div>
  );
}

export default OrderHistory;
