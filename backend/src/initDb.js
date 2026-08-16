import {q,pool} from "./db.js"; import bcrypt from "bcryptjs";
const hash=await bcrypt.hash("123456",10);
await q(`DROP TABLE IF EXISTS speaking_sessions,course_enrollments,assignments,academic_records,courses,subjects,users CASCADE;
CREATE TABLE users(id SERIAL PRIMARY KEY,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL,password TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'STUDENT',department TEXT,semester INT);
CREATE TABLE subjects(id SERIAL PRIMARY KEY,code TEXT UNIQUE NOT NULL,name TEXT NOT NULL,semester INT,teacher TEXT);
CREATE TABLE academic_records(id SERIAL PRIMARY KEY,user_id INT REFERENCES users(id) ON DELETE CASCADE,subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,score NUMERIC NOT NULL DEFAULT 0,attendance NUMERIC NOT NULL DEFAULT 0,assignment_score NUMERIC NOT NULL DEFAULT 0,UNIQUE(user_id,subject_id));
CREATE TABLE assignments(id SERIAL PRIMARY KEY,subject_id INT REFERENCES subjects(id) ON DELETE CASCADE,title TEXT NOT NULL,due_date DATE,status TEXT DEFAULT 'Pending');
CREATE TABLE courses(id SERIAL PRIMARY KEY,title TEXT NOT NULL,description TEXT,duration TEXT,instructor TEXT,category TEXT,level TEXT DEFAULT 'Beginner');
CREATE TABLE course_enrollments(id SERIAL PRIMARY KEY,user_id INT REFERENCES users(id) ON DELETE CASCADE,course_id INT REFERENCES courses(id) ON DELETE CASCADE,progress INT DEFAULT 0,UNIQUE(user_id,course_id));
CREATE TABLE speaking_sessions(id SERIAL PRIMARY KEY,user_id INT REFERENCES users(id) ON DELETE CASCADE,topic TEXT,transcript TEXT,fluency INT,grammar INT,confidence INT,pronunciation INT,overall INT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
const users=[["Harshith","student@acadex.com","STUDENT","Computer Science",4],["Dr. Anand","teacher@acadex.com","TEACHER","Computer Science",null],["Acadex Admin","admin@acadex.com","ADMIN","Administration",null]];
for(const u of users)await q("INSERT INTO users(name,email,password,role,department,semester) VALUES($1,$2,$3,$4,$5,$6)",[u[0],u[1],hash,...u.slice(2)]);
const sid=(await q("SELECT id FROM users WHERE email='student@acadex.com'")).rows[0].id;
const subs=[["CS401","Data Structures","Dr. Anand",84,92,88],["MA401","Discrete Mathematics","Dr. Priya",58,68,62],["CS402","Database Systems","Dr. Kumar",76,85,80],["CS403","Operating Systems","Dr. Ravi",71,78,74],["CS404","Computer Networks","Dr. Meena",67,72,70],["HS401","Professional Communication","Dr. Sarah",89,94,91]];
for(const x of subs){let s=(await q("INSERT INTO subjects(code,name,semester,teacher) VALUES($1,$2,4,$3) RETURNING id",x.slice(0,3))).rows[0];await q("INSERT INTO academic_records(user_id,subject_id,score,attendance,assignment_score) VALUES($1,$2,$3,$4,$5)",[sid,s.id,...x.slice(3)]);}
await q(`INSERT INTO assignments(subject_id,title,due_date,status) VALUES
((SELECT id FROM subjects WHERE code='CS401'),'Binary Tree Implementation',CURRENT_DATE+3,'Pending'),
((SELECT id FROM subjects WHERE code='CS402'),'SQL Normalization Report',CURRENT_DATE+6,'Pending'),
((SELECT id FROM subjects WHERE code='CS403'),'Process Scheduling Assignment',CURRENT_DATE+10,'Pending')`);
const courses=[["Python for Beginners","Learn Python fundamentals and problem solving.","8 weeks","Sarah Johnson","Programming","Beginner"],["Full Stack Web Development","Build modern frontend and backend applications.","12 weeks","Arun Kumar","Web Development","Intermediate"],["Artificial Intelligence Fundamentals","Introduction to machine learning and AI concepts.","10 weeks","Dr. Meera","AI","Beginner"],["Data Structures Masterclass","Algorithms, complexity and interview preparation.","8 weeks","Dr. Anand","Programming","Intermediate"],["UI UX Design","Design useful and visually strong digital products.","6 weeks","Priya S","Design","Beginner"],["Communication Mastery","Improve speaking, confidence and interview communication.","6 weeks","Speakit Coach","Soft Skills","Beginner"]];
for(const c of courses)await q("INSERT INTO courses(title,description,duration,instructor,category,level) VALUES($1,$2,$3,$4,$5,$6)",c);
await q("INSERT INTO course_enrollments(user_id,course_id,progress) VALUES($1,1,65),($1,2,30)",[sid]);
console.log("Database initialized successfully."); await pool.end();