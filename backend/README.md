
| API | Method | Data body | Response (If OK) | Description |
| :- | :-: | :-| :- | :- |
| http://localhost:5000/user/register| POST | {<br>username: string <br> password: string <br> fullname: string<br>} | | User register |
| http://localhost:5000/user/login | POST | {<br>username: string <br> password: string<br>} | | User login
| http://localhost:5000/device/led | GET | | {<br>value: led's value("0" \| "1")<br>} | Get led's value |
| http://localhost:5000/device/door | GET | | {<br>value: door's value("0" \| "1")<br>} | Get door's value |
| http://localhost:5000/device/fan | GET | | {<br>value: fan's value(0 - 100)<br>} | Get fan speed 
| http://localhost:5000/device/led | POST | {<br>value: string("0" or "1")<br>} | {<br>msg: "Succesfully"<br>} | Send data from client to turn on/off the led |
| http://localhost:5000/device/fan | POST | {<br>value: string(0 - 100)<br>} | {<br>msg: "Succesfully"<br>} | Send data from client to adjust fan speed  |
| http://localhost:5000/device/door | POST | {<br>value: string("0" or "1"<br>} | {<br>msg: "Succesfully"<br>} | Send data from client to open/close the door |
