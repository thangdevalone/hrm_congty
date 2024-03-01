import { format, parse } from "date-fns";
import { TimeValue } from "react-aria";

export function formatTime(timeString:string) {
    const parsedTime = parse(timeString, 'HH:mm:ss', new Date());
    return format(parsedTime, 'h:mm a');
  }
export function parseTimeString(timeString: string): TimeValue {
    const [hoursStr, minutesStr, secondsStr] = timeString.split(":");
    let hour = parseInt(hoursStr);
    const minute = parseInt(minutesStr);
    const second = parseInt(secondsStr);

    // Kiểm tra xem thời gian là buổi sáng (AM) hay buổi chiều (PM)

    // Chuyển đổi giờ sang định dạng 12 giờ
    if (hour > 12) {
        hour -= 12;
    }

    // Tạo một đối tượng thời gian mới với các giá trị đã cập nhật
    const timeValue: TimeValue = {
        hour,
        minute,
        second,
        millisecond: 0
    } as TimeValue;

    return timeValue;
}
export function formatTimeValue(timeValue: TimeValue): string {
    // Ensure hour, minute, and second are formatted with leading zeros
    const hourStr = String(timeValue.hour).padStart(2, '0');
    const minuteStr = String(timeValue.minute).padStart(2, '0');
    const secondStr = String(timeValue.second).padStart(2, '0');

    // Concatenate components with ":" separator
    return `${hourStr}:${minuteStr}:${secondStr}`;
}