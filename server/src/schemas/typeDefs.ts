const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Credit {
    referenceId: ID
    modelType: String
    roleType: String
    role: String
  }

  type Person {
    tmdbID: ID
    name: String
    gender: Number
    primaryRole: String
    credits: [Credit]!
  }

  type GenreMovie {
    tmdbID: ID
    name: String
  }

  type GenreTV {
    tmdbID: ID
    name: String
  }

  type Movie {
    tmdbID: ID
    title: String
    tagline: String
    releaseDate: String
    runtime: Number
    revenue: Number
    overview: String
    genre: [GenreMovie]
    budget: Number
    posterPath: String
    cast: [Person]
    crew: [Person]
  }

  type TVShow {
    tmdbID: ID
    name: String
    createdBy: [Person]
    startedAirDate: String
    lastAirDate: String
    genres: [GenreTV]
    seasons: Number
    episodes: Number
    overview: String
    posterPath: String
    tagline: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Metric {
    _id: ID!
    name: String!
    score: Number!
  }

  type Critique {
    _id: ID!
    user: User
    movie?: Movie
    show?: TVShow
    metrics: [Metric]
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addThought(input: ThoughtInput!): Thought
    addComment(thoughtId: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought
  }
`;

export default typeDefs;

// Must add the functionality(another model?) for the user to create their oewn metrics, connect to user/movie, then find a way to make that scalable so that the metrics can be combined, QUERIES AND MUTATIONS NOT TOUCHED

// CHANGES TO MODELS - Added score and metric/critique complexity and set up for templates and referencing others metrics, now need to add typedefs and finalize this side - if we can do that, we should just have resolvers for backend and then we can test with dummy data or jump right into cron/worker for tmdb API