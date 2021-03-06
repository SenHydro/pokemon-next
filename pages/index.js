import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useState,useEffect } from 'react'

// SSR(Server-Side Rendering)
// export async function getServerSideProps() {
//   const res = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");

//   return {
//     props: {
//       pokemon: await res.json(),
//     }
//   }
// }

// SSG(Static Site Generator)
export async function getStaticProps() {
  const res = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");

  return {
    props: {
      pokemon: await res.json(),
    }
  }

}

export default function Home({ pokemon }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon GO</title>
      </Head>

      <h2>Pokemon List</h2>
      {/* <div>{JSON.stringify(pokemon)}</div> */}
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
      
    </div>
  )
}
