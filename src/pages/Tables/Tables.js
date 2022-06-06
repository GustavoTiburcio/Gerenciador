import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';
import { makeStyles } from '@material-ui/styles';
import { ReactComponent as RestaurantTable } from '../../assets/restaurant-table.svg';
//import { Link } from 'react-router-dom'


function Tables() {
    const styles = useStyles();
    const [tables, setTables] = useState([]);
    const [finishedOrder, setFinishedOrder] = useState([]);

    async function getTables() {
        try {
            const response = await api.get('/tables');
            setTables(response.data.tables);
        } catch (error) {
            console.log(error);
            throw new Error(400);
        }
    }

    async function finishOrderProgress(table_id) {
        try {
            const response = await api.patch(`/orders/finishOrderProgress/tableId=${table_id}`);
            setFinishedOrder(response.data);
        } catch (error) {
            console.log(error);
            throw new Error(400);
        }
    }

    useEffect(() => {
        getTables()
    }, [finishedOrder])

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
                <h1 className={styles.titlesDiv}>Mesas</h1>
                <div className={styles.legendasDiv}>
                    <span style={{ color: '#3bbf17', fontFamily: 'sans-serif', fontWeight: 'bold' }}>█ Disponível</span>
                    <span style={{ color: '#bf2217', fontFamily: 'sans-serif', fontWeight: 'bold', marginLeft: 10 }}>█ Ocupado</span>
                    <hr
                        style={{
                            color: '#000',
                            backgroundColor: '#000',
                            widht: '100%'
                        }}
                    />
                </div>
                <div className={styles.tablesDiv}>
                    {tables.map((table) => {
                        return (
                            <span key={table.number} className={styles.tablesNumber}>
                                <RestaurantTable
                                    fill="currentColor"
                                    stroke="currentColor"
                                    style={{
                                        height: 150,
                                        width: 200,
                                        color: table.available === false ? '#bf2217' : '#3bbf17',
                                        margin: 10,
                                        cursor: table.available === false ? 'pointer' : 'default',
                                    }}
                                    onClick={() => {
                                        if (table.available === false) {
                                            window.confirm(`Fechar comanda da mesa ${table.number}?`) ? finishOrderProgress(table.number) : console.log("cancel")
                                        }
                                    }
                                    }
                                />
                                {table.number}
                            </span>
                        )
                    })}
                </div>
                <br />
            </div>
            <Footer />
        </div>
    );
}

const useStyles = makeStyles({
    container: {
        height: '100%',
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitlesDiv: {

    },
    tablesDiv: {
        flexFlow: 'wrap',
        width: '70%',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
    },
    tablesNumber: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: 24
    },
    titlesDiv: {
        textAlign: 'center',
        fontFamily: 'sans-serif',
        color: '#2c2e30'
    },
});

export default Tables;
