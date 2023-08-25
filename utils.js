export function getTimeBetween(target_date) {
    const current_date = new Date();
    const difference = target_date - current_date; // total time between in milliseconds
    const totalTimeInSeconds = difference / 1000;
    
    const seconds = Math.floor(totalTimeInSeconds % 60); // extracting the remaining seconds
    const minutes = Math.floor((totalTimeInSeconds / 60) % 60); // extracting the remaining minutes
    const hours = Math.floor((totalTimeInSeconds / 3600) % 24);  // extracting the remaining hours
    const days = Math.floor(totalTimeInSeconds / 86400);

    return {
        hours,
        minutes,
        seconds,
        days,
        totalTimeInSeconds
    }
}