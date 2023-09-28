document.addEventListener("DOMContentLoaded", function () {
  const currentDayElement = document.getElementById("currentDay");
  const currentDate = dayjs().format("dddd, MMMM D, YYYY");
  currentDayElement.textContent = currentDate;

  const savedEvents = JSON.parse(localStorage.getItem("events")) || {};
  const currentHour = dayjs().format("H");

  const container = document.querySelector(".container");

  for (let hour = 0; hour <= 23; hour++) {
    const timeBlock = document.createElement("div");
    timeBlock.className = `time-block ${hour < currentHour ? "past" : hour === currentHour ? "present" : "future"}`;
    timeBlock.id = `hour-${hour}`;

    timeBlock.innerHTML = `
      <div class="row">
        <div class="hour">${dayjs().hour(hour).format("h A")}</div>
        <textarea class="description">${savedEvents[hour] || ""}</textarea>
        <button class="saveBtn"><i class="fas fa-save"></i> Save</button>
      </div>
    `;

    timeBlock.querySelector(".saveBtn").addEventListener("click", function () {
      const currentHour = this.parentElement.parentElement.id.split("-")[1];
      savedEvents[currentHour] = this.parentElement.querySelector(".description").value;
      localStorage.setItem("events", JSON.stringify(savedEvents));
    });

    container.appendChild(timeBlock);
  }
});
