const parseText = (text) => {
  return text
    .replace(/<\?xml.*<txt>(\s*)|(\s)( *)<\/txt>.*<\/song>(\s*)/gs, '')
    .replace(/( *)(-*)<\/ln>(\s*)( *)<ln>(-*)( *)|<\/ln>/gm, '')
    .replace(/.*<ln>/gm, '')
    .replace(/<ln( *)\/>|( *)\*( *)/gm, '\n')
    .replace(/,(?!\s)/g, ', ')
    .replace(/(?<=\S)\s{2,}/g, '\n\n')
    .replace(/\s{3,}|-\s/g, '')
    .replace(/\.(?=\d)/g, '\n\n');
};

module.exports = {
  parseText,
};
