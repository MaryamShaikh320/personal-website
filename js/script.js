"use strict";

const markers = document.querySelectorAll(".marker");
const detailsPanel = document.querySelector(".timeline-details");
const timelinePlaceholderText = `
    <p class="placeholder-text">Click on a dot to learn more about my journey.</p>
`;
let selectedEvent = null;
const eventInfo = {
    fll: {
        title: "FIRST Lego League Team 26361 The Roboclaws",
        description: "As a researcher, I worked on finding soltuion at the intersection of arts and technology. After gainging insights from meetings with specialists, our team presented our finalized idea to a panel of judges. Although we didn't win anything, this was my first introduction to researching and working with a team to ideate a viable product."
    },
    vex: {
        title: "VEX IQ Robotics Team 863A Quasar",
        description: "Starting a rookie community team, I led us to win 13 awards, including the New Jersey State Chapionships and qualifying for the World Championship. I introduced and taught programing concepts and mechanical skills to members and ideated with them to create our robot. Additionally, I worked in high-pressure situations as a main robot driver, often taking the lead in quick decisions."
    },
    dualEnrollment: {
        title: "Dual Enrollment at De Anza",
        description: "Coursework: Intro to Biology, Programming in C++, Programming in Python, Data Structures and Algorithms, Pre-Calculus, Intro to Physics, and Calculus I-II"
    },
    frc: {
        title: "FIRST Robotics Competition Team 3501 The Firebots",
        description: "Developed and maintained robot software for competition using Java and WPILib. I also utilized advanced control system (vision processing, object detection, etc.) to automate controls and paths. Team accomplishments include competing in quarter-finals during the 2026 NorCal District Championships and advancing to the World Championship in 2025 and 2026."
    },
    hiset: {
        title: "Early Exit From High School",
        description: "HiSET is a program that allows a student to skip the last 2 years of high school by assessing knowledge through 3 tests.\n\nMath - 20/20\nWriting - 18/20\nReading - 17/20"

    },
    deAnza: {
        title: "De Anza Community College",
        description: "Enrolled at a local college to finish transfer coursework. Planned coursework includes Calculus III-IV, Physics (Mechanics, Electricity and Magnetism, Fluids, Waves, Optics, and Thermodynamics), Differential Equations, Linear Alegbra, Discrete, Circuits, x86 Processor Assembly Language and Computer Architecture."
    }
};
const pixelsPerMonth = 12;
const timelineStart = new Date("2022-01-01T00:00:00");
const timelineProgress = document.querySelector("#timeline-progress");
const presentLabel = document.querySelector("#timeline-present-label");

const navLinks = document.querySelectorAll(".nav-links a");

const gameModeButton = document.getElementById("game-mode-button");
let gameModeActive = false;
const platforms = document.querySelectorAll(".platform");
let playerX = 6.25;
let playerY = 12.25;
let movingLeft = false;
let movingRight = false;
let velocityY = 0;
const gravity = 0.02;
const jumpStrength = -0.75;
const playerSize = 1.9;
const floorOffset = 3;
let isGrounded = false;

const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

function gameLoop() {
    if (gameModeActive) {
        if (movingRight) {
            playerX += 0.2;
        }

        if (movingLeft) {
            playerX -= 0.2;
        }

        velocityY += gravity;
        playerY += velocityY;

        const floorY = (document.documentElement.scrollHeight / rem) - floorOffset - playerSize;

        if (playerY >= floorY) {
            playerY = floorY;
            velocityY = 0;
            isGrounded = true;
        }
        else {
            isGrounded = false;
        } 

        const playerLeft = playerX * rem;
        const playerRight = playerLeft + playerSize * rem;
        const playerTop = playerY * rem;
        const playerBottom = playerTop + playerSize * rem;

        platforms.forEach((platform) => {
            const rect = platform.getBoundingClientRect();

            const platformLeft = rect.left + window.scrollX;
            const platformRight = rect.right + window.scrollX;
            const platformTop = rect.top + window.scrollY;

            if (playerRight > platformLeft && playerLeft < platformRight) {
                if (
                    velocityY > 0 &&
                    playerBottom >= platformTop &&
                    playerTop < platformTop
                ) {
                    playerY = platformTop / rem - playerSize;
                    velocityY = 0;
                    isGrounded = true;
                }
            }
        });



        player.style.left = playerX + 'rem';
        player.style.top = playerY + 'rem';
    }

    requestAnimationFrame(gameLoop);
}
console.log(gameModeActive);
function getTimelinePosition(dataString) {
    const date = dataString === "present" ? new Date() : new Date(`${dataString}-01T00:00:00`);

    const months =
        (date.getFullYear() - timelineStart.getFullYear()) * 12 +
        (date.getMonth() - timelineStart.getMonth());

    return months * pixelsPerMonth;
}

function formatTimelineDate(dataString) {
    if (dataString === "present") return "Present";

    const [year, month] = dataString.split("-");
    const date = new Date(Number(year), Number(month) - 1);

    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric"
    });
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

gameLoop();

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

            const isMoment = marker.dataset.type === "moment";

            const startDate = isMoment ? marker.dataset.date : marker.dataset.start;
            const endDate = isMoment ? null : marker.dataset.end;

            const dateText = isMoment ? formatTimelineDate(startDate) : `${formatTimelineDate(startDate)} - ${formatTimelineDate(endDate)}`;

            detailsPanel.innerHTML = `
                <div class="timeline-details-content">
                    <div class="timeline-details-main">
                        <h3 class="platform">${info.title}</h3>
                        <p>${info.description}</p>
                    </div>
                    <span class="timeline-event-dates">${dateText}</span>
                </div>
            `;
        }

        console.log(selectedEvent);
    });
});


navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

gameModeButton.addEventListener("click", () => {
    gameModeActive = !gameModeActive;

    gameModeButton.blur();

    if (gameModeActive) {
        player.style.display = 'block';
        gameModeButton.style.color = 'cadetblue';
        gameModeButton.style.borderColor = 'cadetblue';
        player.style.top = playerY + 'rem';
        player.style.left = playerX + 'rem';
    }
    else {
        player.style.display = 'none';
        gameModeButton.style.color = '#7A8CA6';
        gameModeButton.style.borderColor = '#7A8CA6';
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        movingLeft = true;
    }

    if (e.key === "ArrowRight") {
        movingRight = true;
    }

    console.log(e.key);
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") {
        movingLeft = false;
    }

    if (e.key === "ArrowRight") {
        movingRight = false;
    }
});

document.addEventListener("keydown", (e) => {
    e.preventDefault();

    if (e.code === "Space" && gameModeActive && isGrounded) {
        velocityY = jumpStrength;
        isGrounded = false;
    }
});


document.body.style.paddingBottom = "100px";