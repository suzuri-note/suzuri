const format = (dt: Date): string => {
    const yyyy = dt.getFullYear();
    const mm = ('00' + (dt.getMonth() + 1)).slice(-2);
    const dd = ('00' + dt.getDate()).slice(-2);
    return yyyy + '.' + mm + '.' + dd;
};


const formatFromUnixtime = (ts: number): string => {
    const dt = new Date(ts);
    const yyyy = dt.getFullYear();
    const mm = ('00' + (dt.getMonth() + 1)).slice(-2);
    const dd = ('00' + dt.getDate()).slice(-2);
    return yyyy + '.' + mm + '.' + dd;
};

const formatDatetimeFromUnixtime = (ts: number): string => {
    const yyyymmdd = formatFromUnixtime(ts);
    const dt = new Date(ts);
    const hh = ('00' + dt.getHours()).slice(-2);
    const mm = ('00' + dt.getMinutes()).slice(-2);
    return yyyymmdd + ' ' + hh + ':' + mm;
};

export default {
    format,
    formatFromUnixtime,
    formatDatetimeFromUnixtime,
};
