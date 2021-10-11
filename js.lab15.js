document.addEventListener('DOMContentLoaded', () => {

    //Объявление необходимых переменных
    const buttonOpen = document.getElementById('btn');
    const buttonClose = document.getElementById('modalClose');

    var b = document.getElementById('overlay');
    let table = document.querySelector('table');

    let result;
    let arrTableVariant = []

    //Функция проверки типов допустимых значений
    function validType(arrAccess, arrResult){ 
        for (let i = 0; i < arrAccess.length; i++){
            if((arrResult[i] === '') || (arrAccess[i] === '') ){ 
                alert("Не правильно указаны параметры объема кувшина. Заполните все поля...");
                throw new Error();
            }
        }
    }

    //Функция проверки допустимых значений
    function valid(arrAccess, arrResult){ 
    
        for (let i = 0; i < arrAccess.length; i++){

            if(arrResult[i]>arrAccess[i]){
                alert("Недпустимое значение литров, емкость одного из кувшина меньше, чем вы хотите налить в него")
                throw new Error();
            }

            if(typeof arrResult[i] != 'number' || typeof arrAccess[i] != 'number' ){
                alert("Не правильно указаны параметры объема кувшина, укажите числовые параметры объема кувшина в литрах");
                throw new Error();
            }


            if((arrResult[i] < 0) || (arrAccess[i] < 0)){
                alert("Не правильно указаны параметры объема кувшина. Объем не может быть отрицательным...");
                throw new Error();
            }

            if((arrResult[i] % 1 !=0) || (arrAccess[i] % 1 !=0)){
                alert("Не правильно указаны параметры объема кувшина. Объем не может быть не целым числом...");
                throw new Error();
            }

        }

        if(arrResult.length != 3 || arrAccess.length != 3){
            alert("Указано большее/меньшее количество кувшинов. Повторите попытку, указав 3 кувшина");
            throw new Error();
        }

        if(Array.isArray(arrAccess) != true || Array.isArray(arrResult) != true) {
            alert("Не верно указанны данные. Повторите попытку");
            throw new Error();
        }

        if(arrAccess[0]+arrAccess[1] != arrAccess[2]){
            alert("Не верно указанны данные. Суммарный объем кувшина А и Б должен быть равен объему кувшина С, по условию задачи.");
            throw new Error();
        }

        if((arrResult[0]+arrResult[1]+ arrResult[2]) != arrAccess[2]){
            alert("Не верно указанны данные. Суммарный конечный объем кувшина А, Б и С должен быть равен объему кувшина С, по условию задачи.");
            throw new Error();
        }

        
    
    }

    //Функция открытия модального окна
    function modalOpen(){
	    b.style.visibility = 'visible';
	    b.style.opacity = '1';
	    b.style.transition = 'all 0.7s ease-out 0s';
    }

    //Функция закрытия модального окна
    function modalClose(){
	    b.style.visibility = 'hidden';
	    b.style.opacity = '0';
        window.location.reload();
    }

    //Слушатель кнопки "Закрыть модальное окно"
    buttonClose.addEventListener('click', () => {
        modalClose();
    })
   
    //Основной алгоритм вычисления минимального количества операций
    function minimalOperationWaterJug(arrAllVolume, arrResultVolume){

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

        arrTableVariant[0][0] = 0; //Начальное положение
        let tempStep = 0; //Начальное количество ходов
        let recAccess; //Переменная доступа рекурсии

        for (let i = 0; i<=arrAllVolume[0]; i++){ //Заполнение матрицы
            for(let j = 0; j<=arrAllVolume[1]; j++){

                if(arrTableVariant[i][j] == tempStep){ //Если элемент матрицы равен текущему ходу
                    recAccess = false;

                    console.log(arrTableVariant)
                    
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

                    else if((i==0 & j!=0) || (i!=0 & j==0) || (i==arrAllVolume[0] & j!=0) || (i!=arrAllVolume[0] & j==0) || (i!=0 & j==arrAllVolume[1]) || (i==0 & j!=arrAllVolume[1]) || (i==arrAllVolume[0] & j!=arrAllVolume[1]) || (i!=arrAllVolume[0] & j==arrAllVolume[1])){  //Если не указан не угловой элемент
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
        
        if(arrTableVariant[arrResultVolume[0]][arrResultVolume[1]] !== '' & arrTableVariant[arrResultVolume[0]][arrResultVolume[1]] !== null){
            result = arrTableVariant[arrResultVolume[0]][arrResultVolume[1]];
        }

        else{
            result = 'Нет решения'
        }
    }

    function createTable(table, arr){
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

    //Слушатель кнопки "Выполнить"
    buttonOpen.addEventListener('click', () => {

        let volumeOfJugType = [document.getElementById('arrAllVolume_1').value,document.getElementById('arrAllVolume_2').value,document.getElementById('arrAllVolume_3').value];   //Объем кувшинов
        let resultVolumeWaterOfJugType = [document.getElementById('arrResultVolume_1').value,document.getElementById('arrResultVolume_2').value,document.getElementById('arrResultVolume_3').value];  //Результирующий объем, который нуобходимо получить
        validType(volumeOfJugType, resultVolumeWaterOfJugType);

        let volumeOfJug = [+document.getElementById('arrAllVolume_1').value,+document.getElementById('arrAllVolume_2').value,+document.getElementById('arrAllVolume_3').value];   //Объем кувшинов
        let resultVolumeWaterOfJug = [+document.getElementById('arrResultVolume_1').value,+document.getElementById('arrResultVolume_2').value,+document.getElementById('arrResultVolume_3').value];  //Результирующий объем, который нуобходимо получить

        valid(volumeOfJug, resultVolumeWaterOfJug);
        minimalOperationWaterJug(volumeOfJug, resultVolumeWaterOfJug);
        
        if(volumeOfJug[0]>30 || volumeOfJug[1]>30){
            document.getElementById('ops').innerHTML = "Матрица слишком большая... Попробуйте указать меньший объем кувшинов, чтобы получить матрицу вариантов...";
        }
        else{
            createTable(table, arrTableVariant);
        }

        if(result == 'Нет решения'){
            document.getElementById('result').innerHTML = "Нет решения. Указанный объем невозможно получить при заданных условиях"
        }
        else{
            document.getElementById('result').innerHTML = "Требуется " + result + " операций(-ии), чтобы получить необходимое количество объема в указанных кувшинах";
        }

        modalOpen();

    })

})
