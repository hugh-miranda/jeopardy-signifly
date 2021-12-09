from node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .

ARG NUXT_MODE=build
ARG NUXT_FLAGS

ENV NUXT_FLAGS=${NUXT_FLAGS}

RUN npm run ${NUXT_MODE} ${NUXT_FLAGS}
CMD npm run start ${NUXT_FLAGS}
