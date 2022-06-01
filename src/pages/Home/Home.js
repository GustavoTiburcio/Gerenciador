import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom'


function Home() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Header />
      <br />
      <br />
      <br />
      <div className={styles.body}>
        <div className={styles.titlesDiv}>
          <h2 className={styles.title}>Gerenciador de pedidos <br /> para o seu restaurante!!</h2>
          <h3 className={styles.homeSubtitle}>Controle de atendimento, Cadastros, Histórico, Integração mobile...</h3>
          <Link to="/produtos" className={styles.homeButton}>
            COMEÇAR
          </Link>
        </div>
        <img src={require('../../assets/pizza-house-vector.png')} className={styles.image} alt={'Cartão de entrada'} />
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
    justifyContent: 'center'
  },
  titlesDiv: {
    flexDirection: 'column'
  },
  image: {
    height: 600,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 55,
    color: '#263238',
    marginBottom: 40,
    textAlign: 'justify',
  },
  homeSubtitle: {
    fontWeight: 'normal',
    fontSize: 24,
    color: '#9E9E9E',
    marginBottom: 30,
    textAlign: 'justify',
  },
  homeButton:{
    backgroundColor: '#da5c5c',
    borderRadius: 10,
    height: 70,
    width: 235,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#FFF',
    textDecoration: 'none',
  },
});

export default Home;
