// Создаем текст сообщений для событий
strings = {
    'init': '<div class="test_chat_item test_chat_mess-o"><div class="test_chat_mess-text" >Приветствую, меня зовут %name%</div><div class="test_chat_mess-date">%time%</div><div class="test_chat_clear"></div></div>',
    'send_message-s': '<div class="test_chat_item test_chat_mess-o"><div class="test_chat_mess-text" >%text%</div><div class="test_chat_mess-date">%time%</div><div class="test_chat_clear"></div></div>',
    'send_message-u': '<div class="test_chat_item test_chat_mess-u" > <div class="test_chat_mess-text" >%text%</div> <div class="test_chat_mess-date">%time%</div> <div class="test_chat_clear"></div></div>'
};
window.onload = function () {
    // Создаем соединение с сервером

    var server_name = 'http://localhost:3000';
    socket = io.connect(server_name);
   socket.on('connect', function () {
        socket.on('message', function (msg) {
            console.log(msg);
            if (msg.event == 'init') {
                document.querySelector('#operator_img').src = msg.avatar;
                document.querySelector('#operator_name').innerHTML = msg.name;
                document.querySelector('#operator_post').innerHTML = msg.post;
            }

            // Добавляем в лог сообщение, заменив время, имя и текст на полученные
            document.querySelector('#message_scroll_box').innerHTML += strings[msg.event].replace(/\%time\%/, msg.time).replace(/\%name\%/, msg.name).replace(/\%text\%/, unescape(msg.text).replace('<', '&lt;').replace('>', '&gt;')) + '<br>';
            // Прокручиваем лог в конец
            document.querySelector('#message_scroll_box').scrollTop = document.querySelector('#message_scroll_box').scrollHeight;
        });
        // При нажатии <Enter> или кнопки отправляем текст
        document.querySelector('#message').onkeypress = function (e) {
            console.log(e);
            if (e.which == '13') {
                // Отправляем содержимое textarea, закодированное в escape-последовательность
                socket.send(escape(document.querySelector('#message').value));
                // Очищаем textarea
                document.querySelector('#message').value = '';
            }
        };
        //отправка сооющение, если нажать кнопку
        document.querySelector('#send').onclick = function () {
            socket.send(escape(document.querySelector('#message').value));
            document.querySelector('#message').value = '';
        };
       /**
       *Просто скроем чат, на практике нужно реализовывать сворачивание/разворачивание или т.п. Для теста в этом нет смылса.
       */
        document.querySelector('#close_button').onclick = function () {
            document.querySelector('#testChat').style.display = 'none';
        };

    });
};


