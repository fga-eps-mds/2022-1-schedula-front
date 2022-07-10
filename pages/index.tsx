import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const test = 'test'
  console.log(test)

  return (
    <h1
      className={styles.crimson}
      color={styles.crimson}
      onChange={() => {
        return
      }}>
      Projeto agenda
    </h1>
  )
}

export default Home
