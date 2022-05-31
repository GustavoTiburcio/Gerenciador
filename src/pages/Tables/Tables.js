import './Tables.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TablesMaterialTable from '../../components/TablesMaterialTable/TablesMaterialTable';

function Tables() {

  return (
    <div className='container'>
      <Header />
      <TablesMaterialTable />
      <Footer />
    </div>
  );
}

export default Tables;
