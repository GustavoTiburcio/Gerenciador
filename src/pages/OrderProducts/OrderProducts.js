import './OrderProducts.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import OrderProductsMaterialTable from '../../components/MaterialTables/OrderProductsMaterialTable/OrderProductsMaterialTable';

function OrderProducts() {

  return (
    <div className='container'>
      <Header />
      <OrderProductsMaterialTable />
      <Footer />
    </div>
  );
}

export default OrderProducts;
