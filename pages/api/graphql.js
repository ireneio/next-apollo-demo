import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../apollo/schema'
import jwt from 'jsonwebtoken'

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    const { authorization } = req.headers
    const decoded = jwt.decode(authorization)
    if (decoded) {
      return { ...decoded, id: decoded.id.toString(), ...req.headers }
    }
    return { ...req.headers }
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })
