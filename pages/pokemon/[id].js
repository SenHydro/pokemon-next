import { useRouter } from "next/router"
import { useState,useEffect } from 'react'
import styles from '../../styles/Details.module.css'
import Head from 'next/head'
import Link from 'next/link'

// SSR(Server-Side Rendering)
// export async function getServerSideProps({ params }) {
//     const res = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);

//     return {
//         props: {
//             pokemon: await res.json(),
//         }
//     }
// }


export async function getStaticPaths() {
    const res = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json");
    const pokemon = await res.json();

    return {
        paths: pokemon.map((pokemon) => ({
            params: { id: pokemon.id.toString() },
        })),
        fallback: false,
    }
}

// SSG(Static Site Generator)
export async function getStaticProps({ params }) {
    const res = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);

    return {
        props: {
            pokemon: await res.json(),
        },
        revalidate: 30, // For update data every 30 sec
    }
}

export default function Details({ pokemon }) {

    // Client-Side Rendering
    // const { 
    //     query: {id},
    // } = useRouter();

    // const [pokemon, setPokemon] = useState(null);

    // useEffect(() => {
    //   async function getPokemon() {
    //     const res = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
    //     setPokemon(await res.json());
    //   }
    //   if (id) {
    //     getPokemon();
    //   }
      
    // },[id]);

    // if (!pokemon) {
    //     return null;
    // }
  
    return (
    <div>
        <Head>
            <title>{pokemon.name}</title>
        </Head>

        <div>
            <Link href="/">
                <a>Back to Homepage</a>
            </Link>
        </div>

        <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        </div>

    </div>);
}