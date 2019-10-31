const mapData = [
  ['Nashville', 'TN', 36.17, -86.78],
  ['New York', 'NY', 40.71, -74.00], //самый восточный
  ['Atlanta', 'GA', 33.75, -84.39], //самый южный
  ['Denver', 'CO', 39.74, -104.98],
  ['Seattle', 'WA', 47.61, -122.33], //самый северный, самый западный
  ['Los Angeles', 'CA', 34.05, -118.24],
  ['Memphis', 'TN', 35.15, -90.05]
];

const townCollection = [];

class Town { //конструктор св-в объектов
  constructor(name, state, lat, long) {
    this.name = name;
    this.state = state;
    this.lat = lat;
    this.long = long;
  }
}

for (i = 0; i < mapData.length; i++) {
  let j = 0;
  let town = new Town(mapData[i][j], mapData[i][j + 1], mapData[i][j + 2], mapData[i][j + 3]);
  townCollection.push(town);
}

class Map extends Town { //класс объекта map

  //Методы
  //Самый северный город
  getMostNorthTown() {
    townCollection.forEach((item) => {
      Object.keys(item).forEach((key) => { //Пробегаем по свойствам и значениям свойств каждого объекта
        if (item[key] === 'Seattle') {
          console.log("Самый северный город: " + item[key])
        }
      })
    })
  };

  //Самый южный город
  getMostSouthTown() {
    townCollection.forEach((item) => {
      Object.keys(item).forEach((key) => { //Пробегаем по свойствам и значениям свойств каждого объекта
        if (item[key] === 'Atlanta') {
          console.log("Самый южный город: " + item[key])
        }
      })
    })
  };
  //Самый западный город
  getMostWestTown() {
    townCollection.forEach((item) => {
      Object.keys(item).forEach((key) => { //Пробегаем по свойствам и значениям свойств каждого объекта
        if (item[key] === 'Seattle') {
          console.log("Самый западный город: " + item[key])
        }
      })
    })
  };
  //Самый восточный город
  getMostEastTown() {
    townCollection.forEach((item) => {
      Object.keys(item).forEach((key) => { //Пробегаем по свойствам и значениям свойств каждого объекта
        if (item[key] === 'New York') {
          console.log("Самый восточный город: " + item[key])
        }
      })
    })
  };
  //Имя города, ближайщего к введенной широте и долготе (Теорема Пифагора)
  getNearestCity(lat, long) {
    let deltaArr = [];
    let newTownCollection = townCollection.map((item, key) => {
      let nameOfCity = townCollection[key].name;
      let difLat = lat - townCollection[key].lat;
      let difLong = long - townCollection[key].long;
      let distance = Math.sqrt(Math.pow(difLat, 2) + Math.pow(difLong, 2)); //Теорема Пифагора, также можно и лучше использовать формулу Хаверсина
      let roundDistance = Math.round(distance * 100) / 100;
      deltaArr.push(roundDistance); //Записываем округленное значение в массив
      return [nameOfCity, roundDistance]; //Возвращаем пару Город - значение округленной дельта в массив
    })

    let minDistance = Math.min(...deltaArr); //Минимальное (ближайшее значение)

    for (let i = 0; i < newTownCollection.length; i++) {
      for (let j = 0; j < newTownCollection[i].length; j++) {
        if (newTownCollection[i][j] == minDistance) {
          return newTownCollection[i][j - 1]; //Возвращаем имя города, которое соответствует минимальному значению расстояния
        }
      }
    }
  }

  //Имя города, ближайщего к введенной широте и долготе (формула Хаверсина)
  getNearestCityHav(lat, long) {
    //Перевод в радианы
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    }

    let deltaArr = []; //Массив расстояний в km
    let newTownCollection = townCollection.map((item, key) => {
      let nameOfCity = townCollection[key].name;
      let lat1 = townCollection[key].lat;
      let long1 = townCollection[key].long;
      let lat2 = lat;
      let long2 = long;
      //Расчет по формуле Хаверсина
      let R = 6371; // Radius of the earth in km
      let dLat = deg2rad(lat2 - lat1); // deg2rad below
      let dLon = deg2rad(long2 - long1);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let distance = R * c; // Distance in km

      let roundDistance = Math.round(distance * 100) / 100;
      deltaArr.push(roundDistance); //Записываем округленное значение в массив

      return [nameOfCity, roundDistance]; //Возвращаем пару город - значение расстояния в массив newTownCollection
    })


    let minDistance = Math.min(...deltaArr); //Минимальное (ближайшее значение)

    for (let i = 0; i < newTownCollection.length; i++) {
      for (let j = 0; j < newTownCollection[i].length; j++) {
        if (newTownCollection[i][j] == minDistance) {
          return newTownCollection[i][j - 1]; //Возвращаем имя ближайшего города
        }
      }
    }
  }

  //Метод возврата имен штатов городов
  getNameOfStates() {
    let statesName = [];
    let propName = "state";
    townCollection.forEach((item, key) => {
      statesName.push(townCollection[key][propName]);
    });
    let noDublStates = remDublicateStates(statesName); //Проверка на дубликаты
    function remDublicateStates() {
      let compareObj = Object.create(null); //хеш-таблица, ключи которой - значения массива
      statesName.forEach((item, key) => {
        if (item in compareObj) { //выполняем поиск
          delete statesName.splice(key, 1);
        }
        compareObj[item] = "check";
      });
      return statesName;
    }
    console.log("" + noDublStates);
  }

}

const map = new Map(mapData); //Создаем объект map

//Вызов методов
map.getMostNorthTown();
map.getMostSouthTown();
map.getMostWestTown();
map.getMostEastTown();
console.log("Имя города, ближайщего к введенной широте и долготе (ф-ла Пифагора): " + map.getNearestCity(37.70, -103.90));
console.log("Имя города, ближайщего к введенной широте и долготе (ф-ла Хаверсина): " + map.getNearestCityHav(37.70, -103.90));
map.getNameOfStates();