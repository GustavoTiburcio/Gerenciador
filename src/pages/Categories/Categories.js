import './Categories.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CategoriesMaterialTable from '../../components/CategoriesMaterialTable/CategoriesMaterialTable';

function Categories() {

  return (
    <div className='container'>
      <Header />
      <CategoriesMaterialTable />
      <Footer />
    </div>
  );
}

export default Categories;
