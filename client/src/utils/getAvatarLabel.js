export const getAvatarLabel = (name) => {
    if(name && name.trim()){
        const nameParts = name.split(' ');
        return nameParts.reduce((prev,curr)=>`${prev}${curr[0]?curr[0].toUpperCase():''}`,'')
    }
    else {
        return 'U'
    }
}