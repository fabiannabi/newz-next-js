import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Toolbar} from '../components/toolbar'

export default function Home() {
  return (
    <div className='page-container'>
      <Toolbar/>
      <div className={styles.main}>
        <h1>
          Get the latest news here!!
        </h1>
        <p>
          Browse for free
        </p>
      </div>

    </div>
  )
}
