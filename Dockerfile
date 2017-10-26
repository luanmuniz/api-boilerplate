FROM debian:jessie

RUN rm /bin/sh \
    && ln -s /bin/bash /bin/sh \
    && echo Etc/UTC > /etc/timezone \
    && dpkg-reconfigure --frontend noninteractive tzdata \
    && apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y g++ gcc make python git curl ca-certificates --no-install-recommends \
    && rm -rf /tmp/* \
    && apt-get clean

RUN useradd --user-group --create-home --shell /bin/false app

ENV NODE_ENV production
ENV NODE_VERSION v8.1.3

WORKDIR /opt/nvm
RUN git clone https://github.com/creationix/nvm.git /opt/nvm \
    && source /opt/nvm/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm use $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && ln -s /opt/nvm/versions/node/$NODE_VERSION/bin/node /usr/bin/node \
    && ln -s /opt/nvm/versions/node/$NODE_VERSION/bin/npm /usr/bin/npm

ENV HOME /opt/src
RUN chown -R app:app $HOME/*

COPY ./package.json $HOME/package.json
COPY ./package-lock.json $HOME/package-lock.json
COPY ./yarn.lock $HOME/yarn.lock

USER app
WORKDIR $HOME

RUN yarn install --production

USER root
COPY . $HOME/
RUN mv $HOME/config/config-example.json $HOME/config/config.json

RUN chown -R app:app $HOME/*
USER app

EXPOSE 3000

CMD ["npm", "start"]
