const mongoose = require("mongoose");
const express = require("express");
const Courses = require("./models/courseModel");

const app =  express();
app.use(express.json());


//Root API
app.get('/', (req, res) => {
    try {
        res.status(200).json('Welcome to the root of the API!');
    } catch (error) {
        res.status(500).json('Internal server error');
    }
});

//GET backend courses and sort by name
app.get("/courses/backendcoursessorted", async (req, res) => {
    try {
      const years = await Courses.find();
      let backendCourses = [];
  
      // Iterate through years to gather backend courses
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            year[yearKey].forEach((course) => {
              // Check if the course description contains keywords related to backend
              const isBackendCourse = course.tags.includes("Database") ||
                                       course.tags.includes("Systems") ||
                                       course.tags.includes("Software") ||
                                       course.tags.includes("Enterprise") ||
                                       course.tags.includes("Web") ||
                                       course.tags.includes("Information");
              if (isBackendCourse) {
                backendCourses.push(course);
              }
            });
          }
        });
      });
  
      // Sort backend courses alphabetically by description
      backendCourses.sort((a, b) => a.description.localeCompare(b.description));
  
      res.json(backendCourses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  //GET courses name and specialization
  app.get("/courses/coursenamespecialization", async (req, res) => {
      try {
        const years = await Courses.find();
        let courses = [];
        years.forEach((year) => {
          ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
            if (year[yearKey]) {
              courses.push(...year[yearKey]);
            }
          });
        });
        const descriptionsAndTags = courses.map((course) => ({
          description: course.description,
          tags: course.tags,
        }));
        res.json(descriptionsAndTags);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  });
  
  //GET published BSIT and BSIS courses
  app.get("/courses/publishedcourse", async (req, res) => {
      try {
        const years = await Courses.find();
        let courses = [];
        years.forEach((year) => {
          ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
            if (year[yearKey]) {
              courses.push(...year[yearKey]);
            }
          });
        });
        const descriptionsAndTags = courses
          .filter(
            (course) => course.tags.includes("BSIT") || course.tags.includes("BSIS")
          )
          .map((course) => ({
            description: course.description,
            tags: course.tags,
          }));
        res.json(descriptionsAndTags);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
  });


mongoose.connect('mongodb+srv://tope:12345@test.fqmvkdc.mongodb.net/?retryWrites=true&w=majority&appName=test')
.then(() => {
    const port = process.env.port || 3000;
    app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}...`);
});
}).catch(() => {
    console.log(error);
});