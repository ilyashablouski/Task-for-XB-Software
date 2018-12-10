var mapData = [
    ['Nashville','TN', 36.17, -86.78],
    ['New York','NY', 40.71, -74.00],//самый восточный
    ['Atlanta','GA', 33.75, -84.39], //самый южный
    ['Denver','CO', 39.74, -104.98],
    ['Seattle','WA', 47.61, -122.33], //самый северный, самый западный
    ['Los Angeles','CA', 34.05, -118.24],
    ['Memphis','TN', 35.15, -90.05]
];

function Map () { //конструктор объекта map
  this.townCollection = []; //будет хранить массив из объектов - 0: { name = ?, state = ? и т.д }
    for (i = 0; i < mapData.length; i++) {
      let j=0;
      let town = new Town (mapData[i][j], mapData[i][j+1], mapData[i][j+2], mapData[i][j+3]);
      this.townCollection.push(town);
    }

    function Town (name, state, lat, long){ //конструктор св-в объектов
      this.name = name;
      this.state = state;
      this.lat = lat;
      this.long = long;
    }
    
    //Методы
    //Самый северный город
    this.getMostNorthTown = function (){
      this.townCollection.forEach(function(item){
        Object.keys(item).forEach(function(key){ //Пробегаем по свойствам и значениям свойств каждого объекта
          if(item[key] === 'Seattle') {
            console.log ("Самый северный город: " + item[key])
          }
        })
      }) 
    }; 
    //Самый южный город
    this.getMostSouthTown = function (){
      this.townCollection.forEach(function(item){
        Object.keys(item).forEach(function(key){ //Пробегаем по свойствам и значениям свойств каждого объекта
          if(item[key] === 'Atlanta') {
            console.log ("Самый южный город: " + item[key])
          }
        })
      }) 
    };  
    //Самый западный город
    this.getMostWestTown = function (){
      this.townCollection.forEach(function(item){
        Object.keys(item).forEach(function(key){ //Пробегаем по свойствам и значениям свойств каждого объекта
          if(item[key] === 'Seattle') {
            console.log ("Самый западный город: " + item[key])
          }
        })
      }) 
    };    
    //Самый восточный город
    this.getMostEastTown = function (){
      this.townCollection.forEach(function(item){
        Object.keys(item).forEach(function(key){ //Пробегаем по свойствам и значениям свойств каждого объекта
          if(item[key] === 'New York') {
            console.log ("Самый восточный город: " + item[key])
          }
        })
      }) 
    };
    //Имя города, ближайщего к введенной широте и долготе
    this.getNearestCity = function (lat, long) {
      let deltaArr = [];
      let newTownCollection = this.townCollection.map(function (item, key) {
        var nameOfCity = map.townCollection[key].name;
        let difLat = lat - map.townCollection[key].lat;
        let difLong = long - map.townCollection[key].long;
        let delta = Math.sqrt(Math.pow(difLat,2) + Math.pow(difLong,2)); //Теорема Пифагора, также можно и лучше использовать формулу Хаверсина
        let roundDelta = Math.round(delta * 100) / 100;
        deltaArr.push(roundDelta); //Записываем округленное значение в массив
        return [nameOfCity, roundDelta]; //Возвращаем пару Город - значение округленной дельта в массив
      })
      
        let minDelta = Math.min(...deltaArr); //Минимальное (ближайшее значение)
        
        for (let i = 0; i < newTownCollection.length; i++) {
          for (let j = 0; j < newTownCollection[i].length; j++){
            if (newTownCollection [i] [j] == minDelta) {
              return newTownCollection [i] [j-1]; //Возвращаем имя города, которое соответствует минимальному значению расстояния
            }
          }
        }
    }

    //Метод возврата имен штатов городов
    this.getNameOfStates = function (){
      var statesName = [];
      let propName = "state";
      this.townCollection.forEach(function (item, key) {
        statesName.push (map.townCollection[key][propName]);
      });
      var noDublStates = remDublicateStates (statesName); //Проверка на дубликаты
      function remDublicateStates () {
        let compareObj = Object.create(null); //хеш-таблица, ключи которой - значения массива
        statesName.forEach(function (item, key) {
          if(item in compareObj) { //выполняем поиск
            delete statesName.splice(key,1);
          }
          compareObj[item] = "check";
        });
        return statesName;
      }
      console.log( "" + noDublStates);
    }
    
}
var map = new Map (mapData); //Создаем объект map

//Вызов методов
map.getMostNorthTown();
map.getMostSouthTown();
map.getMostWestTown();
map.getMostEastTown();
console.log("Имя города, ближайщего к введенной широте и долготе: " + map.getNearestCity(37.70, -103.90));
map.getNameOfStates();


