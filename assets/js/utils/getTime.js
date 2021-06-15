const startZero = (num) => `0${num}`.slice(-2);

const getTime = () => {
    const date = new Date();
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map(startZero).join(':');
};

export default getTime;