const { ApolloServer } = require("@apollo/server");
const {
  startServerAndCreateLambdaHandler,
  handlers,
} = require("@as-integrations/aws-lambda");

const getStudents = require("./student/getstudents");
const getStudent = require("./student/getstudent");
const addStudent = require("./student/addstudent");
const deleteStudent = require("./student/deletestudent");
const updateStudent = require("./student/updatestudent");
const updateStudyPoints = require("./student/updatestudypoints");

const typeDefs = `

type Grade {
  coursecode: String
  grade: Int
},

type Student {  
  studentcode: String
  studentname: String
  email: String
  studypoints: Int
  grades: [Grade]
}

input GradeInput {
  coursecode: String
  grade: Int
}

input StudentCodeInput {
  studentcode: String   
}

input StudentPointsInput {
  studentcode: String,
  sp: Int
}

input StudentInput {    
  studentcode: String, 
  studentname: String,
  email: String, 
  studypoints: Int, 
  grades: [GradeInput]
}

type Query {
  getStudents: [Student]
  getStudent(input: StudentCodeInput): Student
}

type Mutation {
  addStudent(input: StudentInput): Student
  deleteStudent(input: StudentCodeInput): Student
  updateStudent(input: StudentInput): Student
  updateStudyPoints(input: StudentPointsInput): String
} 
`;


const resolvers = {
  Query: {
    getStudents: getStudents,
    getStudent: getStudent,
  },
  Mutation: {
    addStudent: addStudent,
    deleteStudent: deleteStudent,
    updateStudent: updateStudent,
    updateStudyPoints: updateStudyPoints,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);
