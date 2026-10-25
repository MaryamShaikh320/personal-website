"use strict";

const markers = document.querySelectorAll(".marker");
const detailsPanel = document.querySelector(".timeline-details");
const timelinePlaceholderText = `
    <p class="placeholder-text">Click on a dot to learn more about my journey.</p>
`;
let selectedEvent = null;
const eventInfo = {
    fll: {
        title: "FIRST Lego League Team ***",
        description: "As a researcher, I worked on finding soltuion at the intersection of arts and technology. After gainging insights from meetings with specialists, out team presented our finalized idea to a panel of judges. Although we didn't win anything, this was my first introduction to researching and working with a team to ideate a viable product."
    },
    vex: {
        title: "VEX IQ Robotics",
        description: "Starting a rookie community team, I led us to win 13 awards, including the *** State Chapionships and qualifying for the World Championship. I introduced and taught programing concepts and mechanical skills to members and ideated with them to create our robot. Additionally, I worked in high-pressure situations as a main robot driver, often taking the lead in quick decisions."
    },
    dualEnrollment: {
        title: "Dual Enrollment at De Anza",
        description: "Coursework: Intro to Biology, Programming in C++, Programming in Python, Pre-Calculus, Intro to Physics, and Calculus I-II"
    },
    frc: {
        title: "FIRST Robotics Competition",
        description: "Developed and maintained robot software for competition using Java and WPILib. I also utilized advanced control system (vision processing, object detection, etc.) to automate controls and paths. Team accomplishments include competing in quarter-finals during the 2026 NorCal District Championships and advancing to the World Championship in 2025 and 2026."
    },
    hiset: {
        title: "Early Exit From High School",
        description: `HiSET is a program that allows a student to skip the last 2 years of high school by assessing knowledge through 3 tests.
        Math - 20/20
        Reading - 17/20
        Writing - 18/20`

    },
    deAnza: {
        title: "*** Community College",
        description: "Enrolled at a local college to finish transfer coursework. Future coursework includes Calculus III-IV, Physics (Mechanics, Electricity and Magnetism, Fliuds, Waves, Optics, and Thermodynamics), Differential Equations, Linear Alegbra, Discrete, Circuits, x86 Processor Assembly Language and Computer Architecture."
    }
};


markers.forEach((marker) => {
    marker.addEventListener("click", function () {
        selectedEvent = selectedEvent === marker.dataset.event ? null : marker.dataset.event;

        markers.forEach((marker) => {
            marker.classList.toggle("active", marker.dataset.event === selectedEvent);
        });

        if (selectedEvent === null) {
            detailsPanel.innerHTML = timelinePlaceholderText;
        }
        else {
            const info = eventInfo[selectedEvent];
            detailsPanel.innerHTML = `
                <h3>${info.title}</h3>
                <p>${info.description}</p>
            `;
        }

        console.log(selectedEvent);
    });
});
