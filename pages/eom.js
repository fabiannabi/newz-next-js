
import styles from '../styles/eom.module.css'
import {Toolbar} from '../components/toolbar'


export const EOM = ({employee}) => {
  console.log(employee)
  return (
      <div className='page-container'>
        <Toolbar/>
          <div className={styles.main}>
            <h1>Employee Of The Month</h1>
            <div className={styles.employee}>
              <img src={employee.image} ></img>
              <h3>Name: {employee.name}</h3>
              <p> Origin: {employee.origin.name}</p>
              <p>Status: {employee.status}</p>
              <p>Species: {employee.species}</p>
            </div>
          </div>
      </div>
  );
};

export const getServerSideProps = async pageContext => {
  const number = Math.ceil(Math.random() * 10)
  const resp =  await fetch(`https://rickandmortyapi.com/api/character/${number}`);

  const employee =  await resp.json();
  return {
    props: {
      employee
    }
  }
};

export default EOM;
