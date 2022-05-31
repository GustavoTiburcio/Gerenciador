import './Produtos.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductsMaterialTable from '../../components/ProductsMaterialTable/ProductsMaterialTable';

function Produtos() {

  return (
    <div className='container'>
      <Header />
      <ProductsMaterialTable />
      <Footer />
    </div>
  );
}

export default Produtos;
