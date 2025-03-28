const mongoose = require("mongoose");
// Import your model
const TimeSlots = require("../models/timeSlots");
const Specialization = require("../models/specializationModel");
const specializationData = require("./data/specializations");

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/Seeduwa_Hopitals_DB")
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => console.log(err));

const generateTimeSlots = (daysOfWeek) => {
  const timeSlots = [];

  daysOfWeek.forEach((day) => {
    let hour = day.startHour;
    let minute = 0;
    while (hour >= day.startHour && hour <= day.endHour) {
      const formattedHour = day.startHour.toString().padStart(2, "0"); // concat with "0" till the length of the string be 2
      const formattedMinute = minute.toString().padStart(2, "0"); // concat with "0" till the length of the string be 2
      const name = `${day.name.slice(0, 3).toUpperCase()} ${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const dayOfWeek = day.name;
      const startTime = `${formattedHour}:${formattedMinute}`;
      timeSlots.push({ name, dayOfWeek, startTime });

      minute += 30;
      if (minute == 60) {
        minute = 0;
        hour++;
      }
    }
  });
  return timeSlots;
};
//console.log(timeSlots);

const daysOfWeek = [
  { name: "Monday", startHour: 8, endHour: 21 },
  { name: "Tuesday", startHour: 8, endHour: 21 },
  { name: "Wednesday", startHour: 8, endHour: 21 },
  { name: "Thursday", startHour: 8, endHour: 21 },
  { name: "Friday", startHour: 8, endHour: 21 },
  { name: "Saturday", startHour: 8, endHour: 17 },
  { name: "Sunday", startHour: 8, endHour: 17 },
];

// const insertManyTimeSlots = async () => {
//   try {
//     const timeSlots = generateTimeSlots(daysOfWeek);
//     TimeSlots.insertMany(timeSlots);
//     console.log("Time slots generated successfully");
//   } catch (err) {
//     console.log(err);
//   }
// };
// const insertManySpecializations = async () => {
//   try {
//     Specialization.insertMany(specializationData);
//     console.log("Specializations generated successfully");
//   } catch (err) {
//     console.log(err);
//   }
// };

//insertManyTimeSlots();
//insertManySpecializations();
