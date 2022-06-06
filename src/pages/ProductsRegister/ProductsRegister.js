import './ProductsRegister.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductsRegisterMaterialTable from '../../components/MaterialTables/ProductsRegisterMaterialTable/ProductsRegisterMaterialTable';

function ProductsRegister() {

  return (
    <div className='container'>
      <Header />
      <ProductsRegisterMaterialTable />
      <Footer />
    </div>
  );
}

export default ProductsRegister;
