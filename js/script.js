"use strict";

const markers = document.querySelectorAll(".marker");
const detailsPanel = document.querySelector(".timeline-details");
const timelinePlaceholderText = `
    <p class="placeholder-text">Click on a dot to learn more about my journey.</p>
`;
let selectedEvent = null;
const eventInfo = {
    fll: {
        title: "FIRST Lego League",
        description: "Researched efficient designs to conserve energy. Talked to specialists to gain insight. Presented ideas and research to a panel of judges"
    },
    vex: {
        title: "VEX IQ Robotics",
        description: "Lead a community robotics team to win 13 awards, including the New Jersey State Championships and a World Championship qualification. Introduced and taught programming and mechanical skills to members. Worked in high-pressure situations as the main robot driver, often taking the lead in making quick decisions"
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
