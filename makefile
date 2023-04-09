#!make

include .env.local
export

dev:
	npm install

unit-test:
	npm test -- --coverage --watchAll=false --testResultsProcessor="jest-junit"

update-openapi:
	wget ${API_URL}/ai-for-u/openapi.json
