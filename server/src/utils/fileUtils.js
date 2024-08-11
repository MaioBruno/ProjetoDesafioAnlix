const fs = require('fs');
const path = require('path');

// Função para ler arquivos e extrair dados em JSON
function readCharacteristicFiles(directory) {
  const files = fs.readdirSync(directory);
  let data = [];

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach(line => {
      if (line.trim()) {
        const [cpf, epoch, value] = line.trim().split(/\s+/);
        data.push({ cpf, epoch: parseInt(epoch, 10), value: parseFloat(value) });
      }
    });
  });

  return data;
}

module.exports = {
  readCharacteristicFiles
};
