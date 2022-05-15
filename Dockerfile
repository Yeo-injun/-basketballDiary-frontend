FROM node:16-alpine

## WORKDIR은 UNIX 명령어로 LINUX "cd"와 같은 명령어
WORKDIR /-basketballDiary-frontend

COPY package.json package-lock.json ./

ADD . .

## package.json에 있는 모든 library를 다운한다.
RUN npm ci
## RUN npm install

EXPOSE 5500

CMD [ "npm", "run", "serve" ]