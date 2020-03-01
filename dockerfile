# 基础镜像
FROM node:8.11.0

# 工作目录
WORKDIR /first-app
# 将文件拷贝至工作目录
COPY . /first-app
# 安装依赖
RUN npm install --verbose
# 暴露端口
EXPOSE 8080
# 运行项目
# CMD ["node", "app.js"]