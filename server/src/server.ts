import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Request, Response } from 'express';
import db from './config/connection.js'
import { ApolloServer } from '@apollo/server';// Note: Import from @apollo/server-express
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
// import { createBullBoard } from 'bull-board';
// import { BullMQAdapter } from 'bull-board/BullMQAdapter.js';
// import { movieQueue, tvShowQueue, personQueue } from './utils/queues/queues.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));

  // const { router: bullBoardRouter } = createBullBoard([
  //   new BullMQAdapter(movieQueue),
  //   new BullMQAdapter(tvShowQueue),
  //   new BullMQAdapter(personQueue),
  // ]);

  // app.use('/admin/queues', bullBoardRouter);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    // console.log(`Bull-Board UI available at http://localhost:${PORT}/admin/queues`);
  });
};

startApolloServer();
