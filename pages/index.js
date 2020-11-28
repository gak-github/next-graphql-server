import Head from 'next/head'
import styles from '../styles/Home.module.css'
import data from './api/data'

export default function Home(props) {
  return (
    <div>
      <p> Name: { props.name }</p>
      <p> Age: { props.age }</p>
      <p> Country: { props.country }</p>
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
      props: data()
  };
}
