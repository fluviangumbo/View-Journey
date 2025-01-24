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
    name: String
    description: String
    subMetrics: [Metric]
    createdBy: User
  }

  type MetricInput {
    name: String!
    description: String
    subMetrics: [Metric]
    createdBy: User!
  }

  type MetricUpdate {
    name: String
    description: String
    subMetrics: [Metric]
  }

  type Score {
    _id: ID
    critique: Critique
    referenceMetric: Metric
    scoreNum: Number
    scoreAlt: String
    scoreDetails: String
  }

  type ScoreInput {
    critique: Critique!
    referenceMetric: Metric!
    scoreNum: Number
    scoreAlt: String
    scoreDetails: String
  }

  type ScoreUpdate {
    scoreNum: Number
    scoreAlt: String
    scoreDetails: String
  }

  type Critique {
    _id: ID!
    user: User
    film?: Movie
    show?: TVShow
    metricScores: [Score]
  }

  type CritiqueInput {
    user: User!
    film?: Movie
    show?: TVShow
    metricScores: [Score]
  }

  type CritiqueUpdate {
    metricScores: [Score]
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    movie(tmdbID: ID!): Movie
    show(tmdbID: ID!): TVShow
    people: [Person]
    person(tmdbID: ID!): Person
    critiques: [Critique]
    critique(critiqueId: ID!): Critique
    userMetrics(username: String!): [Metric]
    metric(metricId: ID!): Metric
    scores(referenceMetric: ID!): [Score]
    score(critique: ID!, referenceMetric: ID!): Score
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addMetric(input: MetricInput!): Metric
    updateMetric(metricId: ID!, input: MetricUpdate): Metric
    removeMetric(metricId: ID!): Metric
    addScore(input: ScoreInput!): Score
    updateScore(scoreId: ID!, input: ScoreUpdate): Score
    removeScore(scoreId: ID!): Score
    addCritique(input: CritiqueInput!): Critique
    updateCritique(critiqueId: ID!, input: CritiqueUpdate): Critique
    removeCritique(critiqueId: ID!): Critique
  }
`;

export default typeDefs;

// Must add the functionality(another model?) for the user to create their oewn metrics, connect to user/movie, then find a way to make that scalable so that the metrics can be combined, QUERIES AND MUTATIONS NOT TOUCHED

// CHANGES TO MODELS - Added score and metric/critique complexity and set up for templates and referencing others metrics, now need to add typedefs and finalize this side - if we can do that, we should just have resolvers for backend and then we can test with dummy data or jump right into cron/worker for tmdb API

// working on typing, resolvers untouched, but need to remember if I have to do a query for all various breakdowns? like movies by genre?

//QUERY: by genre? genres themselves?