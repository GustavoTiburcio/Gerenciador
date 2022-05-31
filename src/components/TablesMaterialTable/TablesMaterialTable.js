import './TablesMaterialTable.css';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
// import GetAppIcon from '@mui/icons-material/GetApp';
import api from '../../services/api';

function TablesMaterialTable() {
  const [tableData, setTableData] = useState([]);
  const columns = [
    { title: 'Código', field: 'id', filterPlaceholder: 'Filtrar por Código', align: 'left', defaultSort: 'asc', editable: 'never' },
    { title: 'Número', field: 'number', filterPlaceholder: 'Filtrar por Número' },
    { title: 'Disponível', field: 'available', lookup: { true: 'Sim', false: 'Não' }, filterPlaceholder: 'Filtrar por Disponibilidade', editable: 'never' },
    { title: 'Cliente', field: 'customer', filterPlaceholder: 'Filtrar por Cliente', editable: 'never', emptyDataSourceMessage: 'Sem cliente' },
  ]

  async function addTable(newTable) {
    try {
      const response = await api.post('/tables', newTable);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  async function getTables() {
    try {
      const response = await api.get('/tables');
      setTableData(response.data.tables);
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  async function updateTable(id, newTable) {
    try {
      const response = await api.put(`/tables/${id}`, newTable);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  async function removeTable(id) {
    try {
      const response = await api.delete(`/tables/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  useEffect(() => {
    getTables();
  }, [])

  return (
    <div className='App'>
      <br />
      <MaterialTable
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            addTable(newRow).then(result => {
              setTableData([...tableData, result.data.createdTable])
              resolve();
            }, rejected => {
              resolve();
              alert('Erro ao tentar adicionar.');
            });

          }),
          onRowUpdate: (newRow, OldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            const updatedTable = { number: newRow.number };
            updateTable(newRow.id, updatedTable).then(result => {
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
            removeTable(selectedRow.id).then(result => {
              updateData.splice(selectedRow.tableData.id, 1)
              setTableData(updateData);
              resolve();
            }, rejected => {
              resolve();
              alert('Erro ao tentar remover.');
            });
          })
        }}
        //Botão de ação customizado
        // actions={[
        //   {
        //     icon: () => <GetAppIcon></GetAppIcon>,
        //     tooltip: 'Click me',
        //     onClick: (e, data) => console.log(data)
        //   }
        // ]}
        options={{
          sorting: true, searchAutoFocus: true,
          filtering: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 10, paginationType: 'stepped',
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
            emptyDataSourceMessage: 'Nenhum registro para exibir',
            filterRow: {
              filterTooltip: 'Filtro'
            },
            editRow: {
              deleteText: 'Deseja mesmo remover esta mesa?',
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
        title='Mesas'
      />
    </div>
  );
}

export default TablesMaterialTable;
