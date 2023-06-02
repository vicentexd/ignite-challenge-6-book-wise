export function findMostFrequentValue(array: Array<any>) {
    if (array.length === 0) {
      return null; // Retorna null se o array estiver vazio
    }
  
    const countMap = array.reduce((map, value) => {
      map[value] = (map[value] || 0) + 1; // Incrementa a contagem do valor atual
      return map;
    }, {});
  
    let maxCount = 0;
    let mostFrequentValue = null;
  
    for (const value in countMap) {
      if (countMap[value] > maxCount) {
        maxCount = countMap[value]; // Atualiza a contagem máxima
        mostFrequentValue = value; // Atualiza o valor mais frequente
      }
    }
  
    return mostFrequentValue;
  }