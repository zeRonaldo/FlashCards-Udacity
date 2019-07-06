export function makeHashId(length) {
    return  (+new Date).toString(36).slice(-length);
 }
 