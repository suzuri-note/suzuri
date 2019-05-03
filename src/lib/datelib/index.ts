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

export default {
    format,
    formatFromUnixtime,
};
