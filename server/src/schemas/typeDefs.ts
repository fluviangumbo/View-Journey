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