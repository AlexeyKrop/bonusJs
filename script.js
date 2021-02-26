'use strict';

let buttonRegister = document.querySelector('.button__register'),
    buttonLogin = document.querySelector('.button__login'),
    userList = document.querySelector('.user__list'),
    headerTitle = document.querySelector('.header__title')
    

let ArrayUsers = [
];

// функция возвращает дату теущую
let formatDate = function (date) {
  let monthNames = [
    "Января", "Февраля", "Марта",
    "Апреля", "Мая", "Июня", "Июля",
    "Августа", "Сентября", "Октября",
    "Ноября", "Декабря",
  ];

  let hour = date.getHours(),
      day = date.getDate(),
      seconds = date.getSeconds(),
      minutes = date.getMinutes(),
      monthIndex = date.getMonth(),
      year = date.getFullYear();

  let zeroFormat = function(x)
    {
        if (x < 10)
        {
            x = '0' + x;
        }
        return x;
    };
  
  hour = zeroFormat(date.getHours());
  
  return day + ' ' + monthNames[monthIndex] + ' ' + year + ', ' + hour + ' : ' + minutes + ' : ' + seconds;
};

let render = function(){
  if (localStorage.getItem('value')){
        ArrayUsers = JSON.parse(localStorage.getItem('value'));
    }
  userList.textContent = '';  
  ArrayUsers.forEach(function(item, index){
    let li = document.createElement('li');
    li.innerHTML =  '<button class="user__remove">' + 'Удалить пользователя' + '</button>' +
                    'Имя: ' + item['Имя'] + ', ' + 'Фамилия: ' + item['Фамилия'] + ', ' + ' зарегистрирован, ' +
                    item['regdate'];
    userList.append(li);  
    let userRemove = li.querySelector('.user__remove');
    userRemove.addEventListener('click', function(){
      ArrayUsers.splice(index, 1);
      li.remove(li)
      localStorage.setItem('value', JSON.stringify(ArrayUsers)); 
      render();
  });          
  });
};

let registerUser = function(){
  let userName = prompt('введите имя и фамилию');
  userName = userName.replace(/\s+/g, " ");
  userName = userName.split(" ");
  let newUser = {
    Имя: userName[0],
    Фамилия: userName[1],
    login: prompt('Введите логин'),
    password: prompt('Введите пароль'),
    regdate: formatDate(new Date()),
  };
  ArrayUsers.push(newUser);
  localStorage.setItem('value', JSON.stringify(ArrayUsers));
  render();
};

buttonRegister.addEventListener('click', registerUser);

buttonLogin.addEventListener('click', function(){
  let userLogin = prompt('Введите логин'),
      userPassword = prompt('Введите пароль');
  ArrayUsers.forEach(function(item, index){
    if(userLogin === ArrayUsers[index]["login"] && userPassword === ArrayUsers[index]['password']){
      headerTitle.innerHTML = `привет ${ArrayUsers[index]['Имя']}`;
    }    
  })
})
render();
