/**
 * Calculates when the Websocket Server will be back up
 * Date is automatically converted to client's local time
 */
export const useWhenIsServerUp = (): string => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const d = new Date();
    d.setUTCSeconds(0);
    d.setUTCMinutes(0);
    d.setUTCHours(0);
    d.setUTCMonth(month, 1);
    d.setUTCFullYear(year);

    return d.toLocaleDateString();
};
