export function isPresent(s) {
    var count = 0;
    for (var i=0; i<s.length; i++)
    {
        if (s.charAt(i) === '1') count++;
    }
    return count >= 3;
}

export function boolToString(pres) {
    return pres ? "11111" : "00000";
}