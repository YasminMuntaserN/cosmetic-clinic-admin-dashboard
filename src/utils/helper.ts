export function timeToMinutes(timeString: string) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
}

export const  formatTime =(date: Date | null) =>(
    date ? date.toTimeString().slice(0, 5) : "");
    

export const getStartDateTime  = (selectedDate: Date | undefined) :Date | null => selectedDate
        ? new Date(selectedDate)
        : null;

export const getEndDateTime = (
    startDate: Date | undefined,
    durationMinutes: number |undefined
): Date | null =>
    durationMinutes ? startDate ? new Date(startDate.getTime() + durationMinutes * 60000) : null : null;

