
| API | Method | Header | Data body | Response (If OK) | Description |
| :- | :-: | :-| :- | :- | :- |
| http://localhost:5000/user/register| POST | | {<br>username: string <br> password: string <br> fullname: string<br>} | | User register |
| http://localhost:5000/user/login | POST | | {<br>username: string <br> password: string<br>} | | User login
| http://localhost:5000/user/history | GET | Authorization: Bearer user_token | | {<br>history: [array of history]<br>} | Get history |
| http://localhost:5000/device/led | GET | Authorization: Bearer user_token | | {<br>value: led's value("0" \| "1")<br>} | Get led's value |
| http://localhost:5000/device/door | GET | Authorization: Bearer user_token | | {<br>value: door's value("0" \| "1")<br>} | Get door's value |
| http://localhost:5000/device/fan | GET | Authorization: Bearer user_token | | {<br>value: fan's value(0 - 100)<br>} | Get fan speed |
| http://localhost:5000/device/led | POST | Authorization: Bearer user_token | {<br>value: string("0" or "1")<br>} | {<br>msg: "Succesfully"<br>} | Send data from client to turn on/off the led |
| http://localhost:5000/device/fan | POST | Authorization: Bearer user_token | {<br>value: string(0 - 100)<br>} | {<br>msg: "Succesfully"<br>} | Send data from client to adjust fan speed  |
| http://localhost:5000/device/door | POST | Authorization: Bearer user_token | {<br>value: string("0" for open or "90" for close<br>} | {<br>msg: "Succesfully"<br>} | Send data from client to open/close the door |
