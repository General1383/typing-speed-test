// محاسبه WPM/CPM/Accuracy

function calcWPM(correctChars,elapsedSeconds){
    if (elapsedSeconds <= 0) return 0;
    return Math.round((correctChars/5),(elapsedSeconds/60));
};

function calcCPM(correctChars,elapsedSeconds){
    if(elapsedSeconds<=0)return 0;
    return Math.round(correctChars / (elapsedSeconds / 60));
};
function calcAccuracy(correct, wrong) {
    const total = correct + wrong;
    if( total===0 ) return 100;
    return Math.round((correct / total) * 100);
};
function getElapsedSeconds(startedAt) {
    if (!startedAt) return 0;

    return (Date.now() - startedAt) / 1000;
};
export {
  calcWPM,
  calcCPM,
  calcAccuracy,
  getElapsedSeconds
};