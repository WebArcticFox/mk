const logsReplace = (text,player1,player2, time = '') => {
    if(!time){
        return text.replace('[player1]', player1.name).replace('[player2]', player2.name);
    }else{
        return text.replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', time);
    }
};

export default logsReplace;