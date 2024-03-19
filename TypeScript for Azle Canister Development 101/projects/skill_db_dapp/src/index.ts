import {
  Canister,
  query,
  text,
  update,
  Record,
  Vec,
  nat64,
  Principal,
  StableBTreeMap,
  Opt,
  ic,
} from "azle";

//We'll cretae a student - skill database
const Student = Record({
  id: Principal,
  username: text,
  createdAt: nat64,
  skillsId: Vec(Principal),
});

const Skill = Record({
  id: Principal,
  name: text,
  createdAt: nat64,
  studentsId: Principal,
});

//Let's create types for students and skills - for storage
type Skill = typeof Skill.tsType;
type Student = typeof Student.tsType;

//Adatabase for students and skills
let Students = StableBTreeMap<Principal, Student>(0);
let Skills = StableBTreeMap<Principal, Skill>(1);

export default Canister({
  //A function to get the total number of students
  getTotalStudents: query([], nat64, () => {
    return Students.len();
  }),
  //A function to create a student
  createStudent: update([text], Student, (username) => {
    const id = generateId();
    const newStudent = {
      id,
      username,
      createdAt: ic.time(),
      skillsId: [],
    };
    Students.insert(id, newStudent);
    return newStudent;
  }),
  //A function to get a student by their id
  getStudentById: query([Principal], Opt(Student), (id) => {
    return Students.get(id);
  }),
  //A function to get all students information
  getStudents: query([], Vec(Student), () => {
    return Students.values();
  }),
  // A function to create a skill, and associate it with a student
  createSkill: update([text, Principal], Skill, (name, studentId) => {
    //Check if the student id exists if not return an error skill
    const studentOpt = Students.get(studentId);
    if ("None" in studentOpt) {
      throw new Error("Student id: " + studentId + "not found");
      return {
        id: Principal.fromUint8Array(new Uint8Array(0)),
        name: "",
        createdAt: (BigInt(ic.time()) * BigInt(0)) as nat64,
        studentsId: Principal.fromUint8Array(new Uint8Array(0)),
      };
    }
    //If the student id exists, create a new skill and associate it with the student
    const student = studentOpt.Some;
    const id = generateId();
    const newSkill = {
      id,
      name,
      createdAt: ic.time(),
      studentsId: student.id,
    };
    //Insert the new skill into the skills database
    Skills.insert(id, newSkill);
    //Update the student passed to the function
    const updatedStudent: Student = {
      ...student,
      skillsId: [...student.skillsId, newSkill.id],
    };
    Students.insert(student.id, updatedStudent);
    return newSkill;
  }),
  // A function to query skill by id
  getSkillById: query([Principal], Opt(Skill), (id) => {
    return Skills.get(id);
  }),
});

//A function to generate a random id that returns it as a Principal
function generateId(): Principal {
  const randomBytes = new Array(29)
    .fill(0)
    .map((_) => Math.floor(Math.random() * 256));

  return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}
