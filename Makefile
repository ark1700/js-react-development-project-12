lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -p 5003 -s ./frontend/dist

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/dist
	npm run build
