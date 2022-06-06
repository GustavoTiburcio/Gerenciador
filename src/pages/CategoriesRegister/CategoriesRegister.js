import './CategoriesRegister.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CategoriesRegisterMaterialTable from '../../components/CategoriesRegisterMaterialTable/CategoriesRegisterMaterialTable';

function CategoriesRegister() {

  return (
    <div className='container'>
      <Header />
      <CategoriesRegisterMaterialTable />
      <Footer />
    </div>
  );
}

export default CategoriesRegister;
