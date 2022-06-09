import './OrderProductsMaterialTable.css';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import api from '../../../services/api';
import { useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function OrderProductsMaterialTable() {
  const { state } = useLocation();
  const { order } = state; // Read values passed on state
  // let navigate = useNavigate();
  const test = [{ id: '1', label: "test" }, { id: '2', label: "test2" }]
  const [tableData, setTableData] = useState([]);
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(null);
  const columns = [
    { title: 'Código', field: 'product_id', filterPlaceholder: 'Filtrar por Código', align: 'left', defaultSort: 'asc', editable: 'never' },
    {
      title: 'Produto', field: 'name', filterPlaceholder: 'Filtrar por Produto', editable: 'onAdd',
      editComponent: props => (
        <Autocomplete
          disablePortal
          isOptionEqualToValue={(option, value) => option.id === value.id}
          id="combo-box"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue);
          }}
          options={test}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Produto" />}
        />
      )
    },
    { title: 'Quantidade', field: 'quantity', filterPlaceholder: 'Filtrar por Quantidade', align: 'left', validate: rowData => rowData.quantity === '' || rowData.quantity === undefined || rowData.quantity === 0 ? 'Preenchimento obrigatório' : '' },
    {
      title: 'Preço', field: 'product_price', filterPlaceholder: 'Filtrar por preço', align: 'left', type: 'currency',
      validate: rowData => rowData.product_price === '' || rowData.product_price === undefined || rowData.product_price === 0 ? 'Preenchimento obrigatório' : '',
      currencySetting: { locale: 'pt-BR', currencyCode: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    },
    // {
    //   title: 'Preço', field: 'product_price', filterPlaceholder: 'Filtrar por preço', align: 'left', type: 'currency',
    //   validate: rowData => rowData.product_price === '' || rowData.product_price === undefined || rowData.product_price === 0 ? 'Preenchimento obrigatório' : '',
    //   currencySetting: { locale: 'pt-BR', currencyCode: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    //   editComponent: {

    //   }
    // },
  ]

  // async function addOrder(newOrder) {
  //   try {
  //     const response = await api.post('/orders', newOrder);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error(400);
  //   }
  // }

  async function getOrders() {
    try {
      const response = await api.get(`/orders/${order.id}`);
      setTableData(response.data.orderProducts);
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }
  async function getProducts() {
    try {
      const response = await api.get('/products');
      setProducts(response.data.products);
      console.log(response.data.products)
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }


  useEffect(() => {
    getOrders();
    getProducts();
  }, [])

  return (
    <div className='App'>
      <br />
      <MaterialTable
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            // addCategory(newRow).then(result => {
            //   setTableData([...tableData, result.data.createdCategory])
            //   resolve();
            // }, rejected => {
            resolve();
            //   alert('Erro ao tentar adicionar.');
            // });
          }),
          onRowUpdate: (newRow, OldRow) => new Promise((resolve, reject) => {
            resolve();
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            resolve();
          })
        }}
        options={{
          sorting: true, searchAutoFocus: true,
          filtering: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 5, paginationType: 'stepped',
          paginationPosition: 'bottom', exportButton: true,
          addRowPosition: 'first', actionsColumnIndex: -1,
          rowStyle: (data, index) => index % 2 === 0 ? { background: '#f5f5f5' } : null,
          headerStyle: { background: '#f3f3f3', fontStyle: 'italic', fontWeight: 'bold' }
        }}
        localization={{
          header: {
            actions: ''
          },
          body: {
            addTooltip: 'Adicionar',
            deleteTooltip: 'Remover',
            editTooltip: 'Alterar',
            emptyDataSourceMessage: 'Nenhum registro para exibir.',
            filterRow: {
              filterTooltip: 'Filtro'
            },
            editRow: {
              deleteText: 'Deseja mesmo remover essa Venda?',
              cancelTooltip: 'Cancelar',
              saveTooltip: 'Confirmar'
            }
          },
          toolbar: {
            exportTitle: 'Exportar dados',
            searchTooltip: 'Pesquisar',
            searchPlaceholder: 'Localizar'
          },
          pagination: {
            labelRowsSelect: 'linhas',
            labelDisplayedRows: '{count} de {from}-{to}',
            firstTooltip: 'Primeira página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página'
          }
        }}
        title='Produtos da Venda'
      />
      <br />
    </div>
  );
}

export default OrderProductsMaterialTable;
