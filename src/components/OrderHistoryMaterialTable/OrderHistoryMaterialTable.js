import './OrderHistoryMaterialTable.css';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import api from '../../services/api';
import { useNavigate } from "react-router-dom";

function OrderHistoryMaterialTable() {
  let navigate = useNavigate(); 
  const [tableData, setTableData] = useState([]);
  const columns = [
    { title: 'Código', field: 'id', filterPlaceholder: 'Filtrar por Código', align: 'left', defaultSort: 'asc', editable: 'never' },
    { title: 'Cliente', field: 'customer', filterPlaceholder: 'Filtrar por Cliente' },
    { title: 'Desconto', field: 'discount', filterPlaceholder: 'Filtrar por desconto', align: 'left', type: 'currency', currencySetting: { locale: 'pt-BR', currencyCode: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 } },
    { title: 'Total Bruto', field: 'amount', filterPlaceholder: 'Filtrar por total Bruto', editable: 'never', align: 'left', type: 'currency', currencySetting: { locale: 'pt-BR', currencyCode: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 } },
    { title: 'Total Liquido', field: 'netAmount', filterPlaceholder: 'Filtrar por total Líquido', editable: 'never', align: 'left', type: 'currency', currencySetting: { locale: 'pt-BR', currencyCode: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 } },
    { title: 'Data', field: 'order_date', filterPlaceholder: 'Filtrar por Data', align: 'left', type: 'datetime', },
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
      const response = await api.get('/orders');
      setTableData(response.data.Orders);
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  async function updateOrder(id, newOrder) {
    try {
      const response = await api.put(`/orders/${id}`, newOrder);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  async function removeOrder(id) {
    try {
      const response = await api.delete(`/orders/${id}`);
      return response;
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
            var dateTime = new Date(newRow.order_date);
            var currentDateTime = new Date(newRow.order_date);
            currentDateTime.setHours(dateTime.getHours() - 3);
          
            const updatedData = [...tableData]
            const updatedOrder = { customer: newRow.customer, discount: newRow.discount, amount: newRow.amount, order_date: currentDateTime };

            newRow.netAmount = newRow.amount - newRow.discount;
            updateOrder(newRow.id, updatedOrder).then(result => {
              updatedData[OldRow.tableData.id] = newRow;
              setTableData(updatedData);
              resolve();
            }, rejected => {
              resolve();
              alert('Erro ao tentar editar.');
            });
          }),
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            const updateData = [...tableData]

            removeOrder(selectedRow.id).then(result => {
              updateData.splice(selectedRow.tableData.id, 1)
              setTableData(updateData);
              resolve();
            }, rejected => {
              resolve();
              alert('Erro ao tentar remover.');
            });
          })
        }}
        actions={[
          {
            icon: () => <ProductionQuantityLimitsIcon></ProductionQuantityLimitsIcon>,
            tooltip: 'Alterar Produtos',
            onClick: (e, data) => navigate('/produtosVenda', { state: { order: data } })
          }
        ]}
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
        title='Histórico de Vendas'
      />
      <br />
    </div>
  );
}

export default OrderHistoryMaterialTable;
