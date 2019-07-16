FROM node:8-jessie
WORKDIR /usr/src/nodeconfg
COPY . .

COPY ./docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3000
CMD ["npm", "run", "start"]
