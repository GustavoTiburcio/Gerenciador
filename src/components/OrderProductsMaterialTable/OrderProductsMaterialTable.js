import './OrderProductsMaterialTable.css';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useLocation } from "react-router-dom";

function OrderProductsMaterialTable() {
  const { state } = useLocation();
  const { order } = state; // Read values passed on state
  // let navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const columns = [
    { title: 'Código', field: 'product_id', filterPlaceholder: 'Filtrar por Código', align: 'left', defaultSort: 'asc', editable: 'never' },
    { title: 'Nome', field: 'name', filterPlaceholder: 'Filtrar por Produto' },
    { title: 'Quantidade', field: 'quantity', filterPlaceholder: 'Filtrar por Quantidade', align: 'left', },
    { title: 'Preço', field: 'product_price', filterPlaceholder: 'Filtrar por preço', align: 'left', type: 'currency', currencySetting: { locale: 'pt-BR', currencyCode: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 } },
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


  useEffect(() => {
    getOrders();
  }, [])

  return (
    <div className='App'>
      <br />
      <MaterialTable
        columns={columns}
        data={tableData}
        editable={{
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
