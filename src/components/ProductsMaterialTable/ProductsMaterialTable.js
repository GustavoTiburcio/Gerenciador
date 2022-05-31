import './ProductsMaterialTable.css';
import MaterialTable from 'material-table';
import { useEffect, useState } from 'react';
// import GetAppIcon from '@mui/icons-material/GetApp';
import api from '../../services/api';

function ProductsMaterialTable() {
  const [tableData, setTableData] = useState([]);
  const [categories, setCategories] = useState({ 1: '' });
  const columns = [
    { title: 'Código', field: 'id', filterPlaceholder: 'Filtrar por Código', align: 'left', defaultSort: 'asc', editable: 'never' },
    { title: 'Nome', field: 'name', filterPlaceholder: 'Filtrar por Nome' },
    { title: 'Preço', field: 'price', filterPlaceholder: 'Filtrar por Preço', align: 'left', type: 'currency', currencySetting: { locale: 'pt-BR', currencyCode: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 } },
    { title: 'Categoria', field: 'category_id', lookup: categories, filterPlaceholder: 'Filtrar por Categoria', align: 'left' },
  ]

  async function addProduct(newProduct) {
    try {
      const response = await api.post('/products', newProduct);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  async function getProducts() {
    try {
      const response = await api.get('/products');
      setTableData(response.data.products);
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  async function getCategories() {
    try {
      let response = await api.get('/categories');
      response.data.categories.unshift({ name: '' });
      let cat = response.data.categories.map(category => {
        return category.category
      });
      cat = { ...cat };
      delete cat['0'];
      setCategories(cat);
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  async function updateProduct(id, newProduct) {
    try {
      const response = await api.put(`/products/${id}`, newProduct);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  async function removeProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(400);
    }
  }

  useEffect(() => {
    getProducts();
    getCategories();
  }, [])

  return (
    <div className='App'>
      <br />
      <MaterialTable
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            addProduct(newRow).then(result => {
              setTableData([...tableData, result.data.createdProduct])
              resolve();
            }, rejected => {
              resolve();
              alert('Erro ao tentar adicionar.');
            });

          }),
          onRowUpdate: (newRow, OldRow) => new Promise((resolve, reject) => {
            const updatedData = [...tableData]
            const updatedProduct = { name: newRow.name, price: newRow.price, category_id: newRow.category_id };
            updateProduct(newRow.id, updatedProduct).then(result => {
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
            removeProduct(selectedRow.id).then(result => {
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
              deleteText: 'Deseja mesmo remover este produto?',
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
        title='Produtos'
      />
    </div>
  );
}

export default ProductsMaterialTable;
