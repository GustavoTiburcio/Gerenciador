import './TablesRegister.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TablesMaterialTable from '../../components/TablesRegisterMaterialTable/TablesRegisterMaterialTable';

function TablesRegister() {

  return (
    <div className='container'>
      <Header />
      <TablesMaterialTable />
      <Footer />
    </div>
  );
}

export default TablesRegister;
