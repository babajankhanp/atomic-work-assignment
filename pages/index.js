import Head from "next/head";

import styled from "styled-components";

import React from 'react'
import { Dropdown } from "@/components";

const Home = () => {
  return (
   <>
     <Head>
        <title>Atomic Works Assignment</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section aria-hidden={true}>
       <Conatiner aria-hidden={true}>
        <h1>Reusable Dropdown Component</h1>
        <Dropdown url="/api/options" />
        </Conatiner>
      </Section>
   </>
  )
}
  const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);
`;

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 4rem 0;


  &::before {
    content: "";
    background: var(--secondary-glow);
    border-radius: 50%;
    width: 480px;
    height: 360px;
    margin-left: -400px;
    position: absolute;
    left: 50%;
    filter: blur(45px);
  }

  &::after {
    content: "";
    background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9);
    width: 240px;
    height: 180px;
    position: absolute;
    left: 50%;
    z-index: -1;
  }
`;


export default Home;