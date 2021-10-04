//Для набора из 3 кувшинов с водой емкостью A, B и C литров найдите минимальное
//количество операций, выполняемых перед тем, как каждый кувшин наберет x, y и z литров. 
//Только кувшин С может полностью заполняться. Операция может быть любой из следующих: 
//кувшин опорожняется, кувшин наполняется, или вода переливается из одного кувшина в 
//другой, пока один из кувшинов не станет пустым или полным. Например, кувшины A, B и C 
//вместимостью 3, 5 и 8 литров, где кувшины A и B вначале пусты, а C имеет полных 8 
//литров, требуют 2 операций для достижения состояния 0, 3 и 5 литров в кувшины. 
//Создайте функцию, которая, учитывая массив емкостей кувшина [A, B, C] и массив 
//состояний цели [x, y, z], возвращает минимальное количество операций, необходимых 
//для достижения состояния цели. Если введенные данные недействительны или решения нет,
//верните «Нет решения». Количество воды в кувшине никогда не может превышать вместимость
//этого кувшина. Общее количество литров в целевом состоянии должно 
//быть равно вместимости кувшина C.

document.addEventListener('DOMContentLoaded', () => {

const button = document.getElementById('btn');
const buttonclose = document.getElementById('swa2');


function access(arrAccess, arrStart, arrResult){ //Функция проверки допустимых значений
    
    for (let i = 0; i < arrAccess.length; i++){
        if(arrStart[i]>arrAccess[i]){
        alert("Недпустимое значение литров, емкость одного из кувшина меньше, чем вы пытаетесь налить")
        return false;
        }

        if(arrResult[i]>arrAccess[i]){
        alert("Недпустимое значение литров, емкость одного из кувшина меньше, чем вы хотите налить в него")
        return false;
        }

        if(typeof arrResult[i] != 'number' || typeof arrAccess[i] != 'number' || typeof arrStart[i] != 'number'){
        alert("Не правильно указаны параметры объема кувшина, укажите числовые параметры объема кувшина в литрах");
        return false;
        }

        if((arrResult[i] === '') || (arrAccess[i] === '') || (arrStart[i] === '')){ // Исправить проверку на пустое значение
            alert("Не правильно указаны параметры объема кувшина. Заполните все поля...");
            return false;
        }
        if((arrResult[i] < 0) || (arrAccess[i] < 0) || (arrStart[i] < 0)){
            alert("Не правильно указаны параметры объема кувшина. Объем не может быть отрицательным...");
            return false;
        }
    }

    if(arrResult.length != 3 ||arrStart.length != 3 || arrAccess.length != 3){
    alert("Указано большее/меньшее количество кувшинов. Повторите попытку, указав 3 кувшина");
    return false;
    }

    if(Array.isArray(arrAccess) != true || Array.isArray(arrStart) != true || Array.isArray(arrResult) != true) {
    alert("Не верно указанны данные. Повторите попытку");
    return false;
    }

    swa()
}

var b = document.getElementById('overlay');
function swa(){
	b.style.visibility = 'visible';
	b.style.opacity = '1';
	b.style.transition = 'all 0.7s ease-out 0s';
}

function swa2(){
	b.style.visibility = 'hidden';
	b.style.opacity = '0';
    window.location.reload();
}




buttonclose.addEventListener('click', () => {
    swa2();
})



let result;
let arrTableVariant = []
function minimalOperationWaterJug(arrAllVolume, arrStartVolume, arrResultVolume){

     //Матрица ходов
    let i,j //Переменная индексов цикла

    for (i = 0; i <= arrAllVolume[0]; i++) { //Заполнение матрицы нулевым значением
        arrTableVariant[i] = []; 
        for (j = 0; j <= arrAllVolume[1]; j++) {
            arrTableVariant[i][j] = null ; 
        }
    }

    for (let i = 1; i <= arrAllVolume[0]-1; i++) {  //Заполнение недоступной зоны матрицы
        for (let j = 1; j <= arrAllVolume[1]-1; j++) {
            arrTableVariant[i][j] = "" ; 
        }
    }


    arrTableVariant[arrStartVolume[0]][arrStartVolume[1]] = 0; //Начальное положение
    let tempStep = 0; //Начальное количество ходов
    let recAccess; //Переменная доступа рекурсии

    for (let i = 0; i<=arrAllVolume[0]; i++){ //Заполнение матрицы
        for(let j = 0; j<=arrAllVolume[1]; j++){
            if(arrTableVariant[i][j] == tempStep){ //Если элемент матрицы равен текущему ходу
                recAccess = false;
                if((i==0 & j==0) || (i==arrAllVolume[0] & j==0) || (i==0 & j==arrAllVolume[1]) || (i==arrAllVolume[0] & j==arrAllVolume[1])){ //Указан угловой элемент
                    if((i==0 & j==0)){ //Левый верхний угол
                        if(arrTableVariant[0][arrAllVolume[1]] == null){arrTableVariant[0][arrAllVolume[1]] = tempStep+1}
                        if(arrTableVariant[arrAllVolume[0]][0] == null){arrTableVariant[arrAllVolume[0]][0] = tempStep+1}
                    }
                    if((i==arrAllVolume[0] & j==0)){ //Нижний левый угол
                        if(arrTableVariant[0][0] == null){arrTableVariant[0][0] = tempStep + 1}
                        if(arrTableVariant[arrAllVolume[0]][arrAllVolume[1]] == null){arrTableVariant[arrAllVolume[0]][arrAllVolume[1]] = tempStep + 1}

                        if((i <= arrAllVolume[1]) & (arrTableVariant[j][i] == null)){arrTableVariant[j][i] = tempStep+1}
                        else if((i>arrAllVolume[1]) & (arrTableVariant[i-arrAllVolume[1]][arrAllVolume[1]] == null)){arrTableVariant[i-arrAllVolume[1]][arrAllVolume[1]] = tempStep+1}
                    }
                    if((i==0 & j==arrAllVolume[1])){ //Правый верхний угол
                        if(arrTableVariant[0][0] == null){arrTableVariant[0][0] = tempStep + 1}
                        if(arrTableVariant[arrAllVolume[0]][arrAllVolume[1]] == null){arrTableVariant[arrAllVolume[0]][arrAllVolume[1]] = tempStep+1}
                    
                        if(i+arrAllVolume[1]<=arrAllVolume[0]){
                            if(arrTableVariant[i+arrAllVolume[1]][0] == null){arrTableVariant[i+arrAllVolume[1]][0] = tempStep+1}
                        }
                        else if((i+arrAllVolume[1]>arrAllVolume[0]) & (arrTableVariant[arrAllVolume[0]][arrAllVolume[1]-(arrAllVolume[0]-i)] == null)){arrTableVariant[arrAllVolume[0]][arrAllVolume[1]-(arrAllVolume[0]-i)] = tempStep+1}
                    }
                    if((i==arrAllVolume[0] & j==arrAllVolume[1])){ //Нижний правый угол
                        if(arrTableVariant[0][arrAllVolume[1]] == null){arrTableVariant[0][arrAllVolume[1]] = tempStep + 1}
                        if(arrTableVariant[arrAllVolume[0]][0] == null){arrTableVariant[arrAllVolume[0]][0] = tempStep+1}
                    }
                }
                else{  //Если не указан не угловой элемент
                    if(i == 0){ //Вехняя часть матрицы
                        if(arrTableVariant[arrAllVolume[0]][j] == null){arrTableVariant[arrAllVolume[0]][j] = tempStep + 1}
                        if(arrTableVariant[0][0] == null){arrTableVariant[0][0] = tempStep +1}
                        if(arrTableVariant[0][arrAllVolume[1]] == null){arrTableVariant[0][arrAllVolume[1]] = tempStep + 1}

                        if(j>=arrAllVolume[0]){
                            if(arrTableVariant[i+arrAllVolume[0]][j-arrAllVolume[0]] == null){arrTableVariant[i+arrAllVolume[0]][j-arrAllVolume[0]] = tempStep +1}
                        }
                        else if(j<arrAllVolume[0] & arrTableVariant[j][i] == null){arrTableVariant[j][i] = tempStep +1}
                    }

                    if(i == arrAllVolume[0]){  //Нижняя часть матрицы
                        if(arrTableVariant[arrAllVolume[0]][arrAllVolume[1]] == null){arrTableVariant[arrAllVolume[0]][arrAllVolume[1]] = tempStep+1}
                        if(arrTableVariant[arrAllVolume[0]][0] == null){arrTableVariant[arrAllVolume[0]][0] = tempStep+1}
                        if(arrTableVariant[0][j] == null){arrTableVariant[0][j] = tempStep+1}

                        if( (j+arrAllVolume[0]) <= arrAllVolume[1]){ 
                            if(arrTableVariant[0][j+arrAllVolume[0]] == null){arrTableVariant[0][j+arrAllVolume[0]] = tempStep+1}
                        }
                        else if(((j+arrAllVolume[0])>arrAllVolume[1]) & (arrTableVariant[arrAllVolume[0] - (arrAllVolume[1] - j)][arrAllVolume[1]] == null)){arrTableVariant[arrAllVolume[0] - (arrAllVolume[1] - j)][arrAllVolume[1]] = tempStep+1}
                    }

                    if(j == 0){  //Левая часть матрицы
                        if(arrTableVariant[0][0] == null){arrTableVariant[0][0] == tempStep +1}
                        if(arrTableVariant[arrAllVolume[0]][0] == null){arrTableVariant[arrAllVolume[0]][0] = tempStep+1}
                        if(arrTableVariant[i][arrAllVolume[1]] == null){arrTableVariant[i][arrAllVolume[1]] = tempStep+1}

                        if(i <= arrAllVolume[1]){ 
                            if(arrTableVariant[j][i] == null){arrTableVariant[j][i] = tempStep+1}
                        }
                        else if((i>arrAllVolume[1]) & (arrTableVariant[i-arrAllVolume[1]][arrAllVolume[1]] == null)){arrTableVariant[i-arrAllVolume[1]][arrAllVolume[1]] = tempStep+1}
                    }

                    if(j == arrAllVolume[1]){  //Правая часть матрицы
                        if(arrTableVariant[arrAllVolume[0]][arrAllVolume[1]] == null){arrTableVariant[arrAllVolume[0]][arrAllVolume[1]] = tempStep+1}
                        if(arrTableVariant[0][arrAllVolume[1]] == null){arrTableVariant[0][arrAllVolume[1]] = tempStep+1}
                        if(arrTableVariant[i][0] == null){arrTableVariant[i][0] = tempStep+1}

                        if(i+arrAllVolume[1]<=arrAllVolume[0]){ 
                            if(arrTableVariant[i+arrAllVolume[1]][0]){arrTableVariant[i+arrAllVolume[1]][0] = tempStep+1}
                        }
                        else if(i+arrAllVolume[1]>arrAllVolume[0]){
                            if(arrTableVariant[arrAllVolume[0]][arrAllVolume[1]-(arrAllVolume[0]-i)] == null){arrTableVariant[arrAllVolume[0]][arrAllVolume[1]-(arrAllVolume[0]-i)] = tempStep+1}
                        }
                    }
                }
            }

            if(i == arrAllVolume[0] & j == arrAllVolume[1]){ //Рекурсия, пока не заполнен каждый элемент
                if(recAccess == false){
                    tempStep++;
                    recAccess = true;
                    i = 0;
                    j = 0;
                }
            }
            
        }   
    }

    console.log(arrTableVariant)
    result = arrTableVariant[arrResultVolume[0]][arrResultVolume[1]];
    console.log(result)
}


let table = document.querySelector('table');

function fillTable(table, arr){
    for(let i = 0; i < arr.length; i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < arr[i].length; j++){
            let td = document.createElement('td');
            td.innerHTML = arr[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}


button.addEventListener('click', () => {

    let volumeOfJug = [+document.getElementById('arrAllVolume_1').value,+document.getElementById('arrAllVolume_2').value,+document.getElementById('arrAllVolume_3').value];   //Объем кувшинов
    let volumeWaterOfJug = [+document.getElementById('arrStartVolume_1').value,+document.getElementById('arrStartVolume_2').value,+document.getElementById('arrStartVolume_3').value];     //Объем начального наполнения кувшинов
    let resultVolumeWaterOfJug = [+document.getElementById('arrResultVolume_1').value,+document.getElementById('arrResultVolume_2').value,+document.getElementById('arrResultVolume_3').value];  //Результирующий объем, который нуобходимо получить

    access(volumeOfJug, volumeWaterOfJug, resultVolumeWaterOfJug)
    minimalOperationWaterJug(volumeOfJug, volumeWaterOfJug, resultVolumeWaterOfJug);
    fillTable(table, arrTableVariant);

    document.getElementById('result').innerHTML = "Требуется " + result + " операций(-ии), чтобы получить необходимое косичество объема в указанных кувшинах";
})

})