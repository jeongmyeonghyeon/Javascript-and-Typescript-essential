#### 디버거 - 크롬 개발자 도구

---

```
1. task
2. launch
3. debugger
```

**task.json**

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "parcel webapp", // 설명 :)
      "type": "shell", // command 속성에서 실행할 실제 애플리케이션의 종류 (parcel.js는 보통 터미널에서 실행하는 애플리케이션으로 그 shell 애플리케이션을 지정하는 의미)
      "command": "parcel index.html", // 작업이 실행되는 실제 명령어
      "isBackground": true // 이걸 켜둬야 VS Code에서 중단없이 번들링을 Background에서 실행시켜 놓고 계속 작업을 할 수 있다. (default false)
    }
  ]
}
```

<br />

**launch.json**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:1234", // parcel이 띄워주는 로컬 주소
      "webRoot": "${workspaceFolder}/dist", // 웹 서버의 root 설정(parcel이 번들링한 웹 서버의 root)
      "preLaunchTask": "parcel webapp" // launch.json을 통해 디버거를 띄우는데, 그 전에 parcel로 번들링을 사전 작업
    }
  ]
}
```

<br />

**VS Code 디버거 실행 과정**

(1) VS Code 좌측의 Run and Debug 탭
(2) 상단 콤보 박스에 launch.json 안에 기술된 configuration을 읽어서 콤보 박스에 표시 (name 속성이 표시된다.)
(3) preLaunchTask가 있으니까, task.json에 가서 pracel webapp을 실행하고 난 다음,
(4) url로 접속해서 디버거에 붙인다.
(5) type이 chrome이므로 크롬 브라우저를 자동으로 실행시킨다.
(6) 실행 시키면, parcel이 작동하는게 콘솔에 보이고
(7) alert에서 Debug Anyway라고 클릭하면 크롬 브라우저가 떠서 실제 앱이 실행 된 상태가 된다.
(8) 디버거를 사용할 수 있는 준비 끝~
(9) 크롬의 디버거와 연동되서 크롬 디버거에서 브레이크 포인트를 찍어도, VS Code에서도 확인할 수 있는 걸 볼 수 있다. (동기화)

<br />

**debugger**

원하고 싶은 곳 브레이킹 포인트를 잡을 수 있는... :)

```js
debugger;
```
