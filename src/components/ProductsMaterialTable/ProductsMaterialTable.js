import './ProductsMaterialTable.css';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import GetAppIcon from '@mui/icons-material/GetApp';
import api from '../../services/api';

function ProductsMaterialTable() {
  // const [tableData, setTableData] = useState([
  //   { name: 'Raj', email: 'raj@gmail.com', phone: 4494561230, age: null, gender: 'M', city: 'Cheenai', fee: 78456 },
  //   { name: 'João', email: 'joao@gmail.com', phone: 4424561230, age: 28, gender: 'F', city: 'Maringa', fee: 45123 },
  //   { name: 'Felipe', email: 'felipe@gmail.com', phone: 4434561230, age: null, gender: 'M', city: 'Sarandi', fee: 45323 },
  //   { name: 'Leonardo', email: 'leonardo@gmail.com', phone: 4444561230, age: 35, gender: 'F', city: 'Marialva', fee: 45789 },
  // ]);
  const [tableData, setTableData] = useState([]);
  const columns = [
    { title: 'Código', field: 'id', filterPlaceholder: 'Filtrar por código', align: 'left', defaultSort: 'asc' },
    { title: 'Nome', field: 'name', filterPlaceholder: 'Filtrar por Nome' },
    { title: 'Preço', field: 'price', filterPlaceholder: 'Filtrar por Preço', align: 'left', currencySetting: { currencyCode: 'BRL', minimumFractionDigits: 2 } },
    { title: 'ID Categoria', field: 'category_id', filterPlaceholder: 'Filtrar por categoria', align: 'left' },
    //{ title: 'Gender', field: 'gender', lookup: { M: 'Male', F: 'Female' } },
  ]

  async function getProducts() {
    const response = await api.get('/products');
    setTableData(response.data.products);
    console.log(response.data)
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className='App'>
      <h1 align='center'>Produtos</h1>
      <MaterialTable
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            setTableData([...tableData, newRow])

            setTimeout(() => resolve(), 1000)
          }),
          onRowUpdate: (newRow, OldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            updatedData[OldRow.tableData.id] = newRow;
            setTableData(updatedData)
            console.log(newRow, OldRow)
            setTimeout(() => resolve(), 1000)
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updateData = [...tableData]
            updateData.splice(selectedRow.tableData.id, 1)
            setTableData(updateData)
            setTimeout(() => resolve(), 1000)
          })
        }}
        //Botão de ação customizado
        actions={[
          {
            icon: () => <GetAppIcon></GetAppIcon>,
            tooltip: 'Click me',
            onClick: (e, data) => console.log(data)
          }
        ]}
        options={{
          sorting: true, searchAutoFocus: true,
          filtering: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 5, paginationType: 'stepped',
          paginationPosition: 'bottom', exportButton: true,
          addRowPosition: 'first', actionsColumnIndex: -1,
          rowStyle: (data, index) => index % 2 == 0 ? { background: '#f5f5f5' } : null,
          headerStyle: { background: '#f3f3f3', fontStyle: 'italic' }
        }}
        title='Produtos'
      />
    </div>
  );
}

export default ProductsMaterialTable;
