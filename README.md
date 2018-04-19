![](https://avatars0.githubusercontent.com/u/4995607?v=3&s=100)

KELIONĖS DRAUGAS
================

# Instalation

## First time

```bash
sudo su -c 'echo "127.0.0.1 symfony.local" >> /etc/hosts'
docker build .docker/php -t php.symfony 
docker build .docker/frontend/ -t frontend.symfony
docker-compose -f .docker/docker-compose.yml up -d
```

## Front container

```bash
docker-compose -f .docker/docker-compose.yml run frontend.symfony
```

```bash
npm install
yarn run encore dev
yarn run encore dev --watch
```

## PHP container

```bash
docker exec -it php.symfony bash
composer install
bin/console cache:clear
bin/console assets:install
```

```bash
bin/console doctrine:database:drop --if-exists --force
bin/console doctrine:database:create --if-not-exists
bin/console doctrine:migrations:migrate --no-interaction
bin/console doctrine:fixtures:load --no-interaction --append
```

## URL

Default: http://symfony.local:8080

SSL: https://symfony.local:8443

