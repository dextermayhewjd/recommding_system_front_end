# Specify a bse image 

FROM node:latest

# 在容器内部创建一个工作目录
WORKDIR /user/front_end/app

# 复制 package.json 和 package-lock.json 文件到容器中
COPY package*.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "start" ]