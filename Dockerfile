FROM node:16-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY back/package.json back/yarn.lock ./back/
COPY front/package.json front/yarn.lock ./front/

# install dependencies
RUN cd front &&\
    yarn --frozen-lockfile &&\
    cd ../back &&\
    yarn --frozen-lockfile &&\
    cd ../

COPY . .

# build application
RUN cd back && yarn build

# remove development dependencies
RUN cd back && npm prune --production

FROM node:16-alpine

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/back/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/back/node_modules ./node_modules

CMD [ "node", "dist" ]