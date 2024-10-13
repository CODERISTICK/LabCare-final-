document.addEventListener("DOMContentLoaded", function() {
    const daysContainer = document.getElementById("days");
    const monthYearDisplay = document.getElementById("monthYear");
    const prevMonthButton = document.getElementById("prevMonth");
    const nextMonthButton = document.getElementById("nextMonth");
    const availableTimesList = document.getElementById("availableTimes");
    const selectedScheduleDisplay = document.getElementById("selectedSchedule");

    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;

    // Function to generate the calendar for the current month
    function generateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update the month/year display
        monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        // Clear the days container
        daysContainer.innerHTML = "";
        availableTimesList.innerHTML = "<li>Select a date to see available times</li>";
        selectedScheduleDisplay.textContent = "No schedule selected";

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Adjust firstDay to consider Monday as the first day
        const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1;

        // Create empty boxes for days before the first day of the month
        for (let i = 0; i < adjustedFirstDay; i++) {
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("day", "empty");
            daysContainer.appendChild(emptyDiv);
        }

        // Create day boxes
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.textContent = day;
            dayDiv.setAttribute("data-date", `${year}-${month + 1}-${day}`);

            dayDiv.addEventListener("click", () => selectDate(dayDiv));

            daysContainer.appendChild(dayDiv);
        }
    }

    // Function to handle date selection and show available appointment times
    function selectDate(dayElement) {
        selectedDate = dayElement.getAttribute("data-date");
        selectedTime = null; // Reset the selected time when a new date is selected

        const appointmentTimes = getAvailableAppointmentTimes(selectedDate);

        // Clear previous available times
        availableTimesList.innerHTML = "";

        if (appointmentTimes.length === 0) {
            const noTimesMessage = document.createElement("li");
            noTimesMessage.textContent = "No available appointments";
            noTimesMessage.classList.add("time-slot");
            availableTimesList.appendChild(noTimesMessage);
        } else {
            appointmentTimes.forEach(time => {
                const listItem = document.createElement("li");
                listItem.classList.add("time-slot");
                listItem.textContent = time;
                listItem.addEventListener("click", () => selectTime(time));
                availableTimesList.appendChild(listItem);
            });
        }
    }

    // Function to handle time selection and update the schedule
function selectTime(time) {
    selectedTime = time;

    const selectedDateObj = new Date(selectedDate);
    const dayOfWeek = selectedDateObj.toLocaleString('default', { weekday: 'long' });
    const formattedDate = selectedDateObj.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });

    selectedScheduleDisplay.textContent = `Your scheduled appointment is set for ${formattedDate} (${dayOfWeek}) at ${selectedTime}.`;
}

    // Function to return available appointment times based on the date
    function getAvailableAppointmentTimes(date) {
        const [year, month, day] = date.split('-').map(Number);

        // Block appointments for any dates in September 2024 or earlier
        if (year < 2024 || (year === 2024 && month <= 9)) {
            return [];
        }

        // No available times for Saturdays (day 6) and Sundays (day 7)
        const dayOfWeek = new Date(year, month - 1, day).getDay();
        if (dayOfWeek === 6 || dayOfWeek === 0) {
            return [];
        }

        // Available times for weekdays (3 to 5 times randomly)
        const defaultTimes = [
            "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM",
            "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM",
            "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
            "4:30 PM", "5:00 PM", "5:30 PM"
        ];

        // Shuffle the times and select between 3 to 5 times
        const shuffledTimes = shuffleArray([...defaultTimes]);
        const numberOfSlots = getRandomInt(3, 5);

        return shuffledTimes.slice(0, numberOfSlots);
    }

    // Utility function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Utility function to generate a random integer between min and max (inclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Event listeners for month navigation buttons
    prevMonthButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });

    nextMonthButton.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });

    generateCalendar();
});
