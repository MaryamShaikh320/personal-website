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
        description: "As a researcher, I worked on finding soltuion at the intersection of arts and technology. After gainging insights from meetings with specialists, our team presented our finalized idea to a panel of judges. Although we didn't win anything, this was my first introduction to researching and working with a team to ideate a viable product."
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
        description: "HiSET is a program that allows a student to skip the last 2 years of high school by assessing knowledge through 3 tests.\n\nMath - 20/20\nWriting - 18/20\nReading - 17/20"

    },
    deAnza: {
        title: "*** Community College",
        description: "Enrolled at a local college to finish transfer coursework. Planned coursework includes Calculus III-IV, Physics (Mechanics, Electricity and Magnetism, Fliuds, Waves, Optics, and Thermodynamics), Differential Equations, Linear Alegbra, Discrete, Circuits, x86 Processor Assembly Language and Computer Architecture."
    }
};
const pixelsPerMonth = 12;
const timelineStart = new Date("2022-01-01T00:00:00");
const timelineProgress = document.querySelector("#timeline-progress");
const presentLabel = document.querySelector("#timeline-present-label");


function getTimelinePosition(dataString) {
    const date = dataString === "present" ? new Date() : new Date(`${dataString}-01T00:00:00`);

    const months =
        (date.getFullYear() - timelineStart.getFullYear()) * 12 +
        (date.getMonth() - timelineStart.getMonth());

    return months * pixelsPerMonth;
}

function updateTimelineProgress() {
    presentLabel.classList.remove("is-lit");

    const selectedMarker = [...markers].find(
        (marker) => marker.dataset.event === selectedEvent
    );

    if (!selectedMarker) {
        timelineProgress.style.height = "0px";
        return;
    }

    let startPosition;
    let endPosition;

    if (selectedMarker.dataset.type === "moment") {
        const position = getTimelinePosition(selectedMarker.dataset.date);
        startPosition = position + selectedMarker.offsetHeight / 2 - 8;
        endPosition = startPosition + 16;
    }
    else {
        startPosition = getTimelinePosition(selectedMarker.dataset.start) + (selectedMarker.offsetHeight / 2);
        endPosition = getTimelinePosition(selectedMarker.dataset.end) + (selectedMarker.offsetHeight / 2);
    }

    timelineProgress.style.transition = "none";
    timelineProgress.style.top = `${startPosition}px`;
    timelineProgress.style.height = "0px";

    timelineProgress.offsetHeight;

    timelineProgress.style.transition = "height 0.8s ease";
    timelineProgress.style.height = `${Math.max(0, endPosition - startPosition)}px`;
}

function positionMarkers() {
    markers.forEach((marker) => {
        const date = marker.dataset.type === "moment" ? marker.dataset.date : marker.dataset.start;
        marker.style.top = `${getTimelinePosition(date)}px`;
    });

    const lastMarker = markers[markers.length - 1];
    document.querySelector("#timeline").style.height = `${getTimelinePosition(lastMarker.dataset.type === "moment" ? lastMarker.dataset.date : lastMarker.dataset.start) + 20}px`;
}


presentLabel.style.top = `${getTimelinePosition("present") + 24}px`;
positionMarkers();
timelineProgress.addEventListener("transitionend", (transitionEvent) => {
    if (transitionEvent.propertyName !== "height") return;

    const selectedMarker = [...markers].find (
        marker => marker.dataset.event === selectedEvent
    );

    if (selectedMarker?.dataset.end === "present") {
        presentLabel.classList.add("is-lit");
    }
});


markers.forEach((marker) => {
    marker.addEventListener("click", function () {
        selectedEvent = selectedEvent === marker.dataset.event ? null : marker.dataset.event;

        markers.forEach((marker) => {
            marker.classList.toggle("active", marker.dataset.event === selectedEvent);
        });

        updateTimelineProgress();

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