import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Senior Mobility Consultant</title>
          <meta
            property="og:title"
            content="test-page - Senior Mobility Consultant"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_noz83) => (
            <>
              <h1>{context_noz83?.Name}</h1>
            </>
          )}
          initialData={props.contextNoz83Prop}
          persistDataDuringLoading={true}
          key={props?.contextNoz83Prop?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextNoz83Prop = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextNoz83Prop: contextNoz83Prop?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
