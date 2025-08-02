 //  Day Time Date section 
        const currentDate = new Date();
        const dateBox = document.querySelector('.date-box');
        // Day
        const day = document.querySelector('.day');
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        day.innerText = days[currentDate.getDay()];
        // Time
        const time = document.querySelector('.time');
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const period = hours >= 12 ? "PM" : "AM";
        time.innerText = ` ${currentDate.getHours()}:${currentDate.getMinutes()} ${period}`;
        // Date
        const date = document.querySelector('.date');
        const d = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
        const m = currentDate.getMonth() < 10 ? `0${currentDate.getMonth()}` : currentDate.getMonth();
        const y = currentDate.getFullYear();
        date.innerText = `${d} / ${m} / ${y}`;
        