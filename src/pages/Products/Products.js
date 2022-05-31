import './Products.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductsMaterialTable from '../../components/ProductsMaterialTable/ProductsMaterialTable';

function Products() {

  return (
    <div className='container'>
      <Header />
      <ProductsMaterialTable />
      <Footer />
    </div>
  );
}

export default Products;
