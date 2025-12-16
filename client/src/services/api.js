// src/services/api.js

export const mockLogin = async (registerNumber, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Demo login credentials
      if (registerNumber === "126158006" && password === "126158006") {
        resolve({
          success: true,
          user: {
            name: "Anirudh Kumar R",
            registerNumber: "126158006",
            department: "Computer Science and Engineering",
            year: "4th Year",

            // FIXED: renamed busId → assignedBus
            assignedBus: "BUS-001",

            pickupPoint: "Mambalasalai",
            city: "Trichy",

            // Multi-city operations
            busCities: ["Thanjavur", "Trichy", "Kumbakonam"]
          }
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 700);
  });
};
