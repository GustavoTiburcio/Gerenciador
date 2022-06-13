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
  const [tableData, setTableData] = useState([]);
  const [products, setProducts] = useState([]);
  // const [price, setPrice] = useState('');
  let price = '';
  const [value, setValue] = useState(null);

  // const handleChange = e => {
  //   console.log(e.target.value)
  //   setPrice(e.target.value)
  // }

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
            if (newValue) {
              setValue(newValue);
              price = newValue.price;
              // setPrice(newValue.price)
            }
            console.log(newValue);
          }}
          options={products}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Produto" />}
        />
      )
    },
    { title: 'Quantidade', field: 'quantity', filterPlaceholder: 'Filtrar por Quantidade', align: 'left', validate: rowData => rowData.quantity === '' || rowData.quantity === undefined || rowData.quantity === 0 ? 'Preenchimento obrigatório' : '' },
    // {
    //   title: 'Preço', field: 'product_price', filterPlaceholder: 'Filtrar por preço', align: 'left', type: 'currency',
    //   validate: rowData => rowData.product_price === '' || rowData.product_price === undefined || rowData.product_price === 0 ? 'Preenchimento obrigatório' : '',
    //   currencySetting: { locale: 'pt-BR', currencyCode: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 },
    // },
    {
      title: 'Preço', field: 'product_price', filterPlaceholder: 'Filtrar por preço', align: 'left', 
      type: 'currency', currencySetting: { locale: 'pt-BR', currencyCode: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 },
      editComponent: props => (
        <TextField
          //error={rowData => rowData.product_price === '' || rowData.product_price === undefined || rowData.product_price === 0}
          // helperText='Preenchimento obrigatório'
          value={price}
          onChange={e => {price = e.value}}
          // type='number'
          placeholder='Preço'
          variant='standard'
          //autoFocus
        />
      )
    },
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
      const prods = response.data.products.map((prod) => {
        return { id: prod.id, label: prod.name, price: prod.price }
      })
      setProducts(prods);
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
