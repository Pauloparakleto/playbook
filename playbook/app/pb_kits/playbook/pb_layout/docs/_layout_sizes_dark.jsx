import React from 'react'
import { Layout } from '../../'

const LayoutSizesDark = (props) => {
  return (
    <div>
      <Layout
          collapse="xs"
          position="left"
          size="xs"
          variant="dark"
          {...props}
      >
        <Layout.Side>
          {'Side'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>

      <br />
      <br />

      <Layout
          collapse="xs"
          position="left"
          size="sm"
          variant="dark"
          {...props}
      >
        <Layout.Side>
          {'Side'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>

      <br />
      <br />

      <Layout
          collapse="xs"
          position="left"
          size="md"
          variant="dark"
          {...props}
      >
        <Layout.Side>
          {'Side'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>

      <br />
      <br />

      <Layout
          collapse="xs"
          position="left"
          size="lg"
          variant="dark"
          {...props}
      >
        <Layout.Side>
          {'Side'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>

      <br />
      <br />

      <Layout
          collapse="xs"
          position="left"
          size="xl"
          variant="dark"
          {...props}
      >
        <Layout.Side>
          {'Side'}
        </Layout.Side>
        <Layout.Body>
          {'Body'}
        </Layout.Body>
      </Layout>
    </div>
  )
}

export default LayoutSizesDark
