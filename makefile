
dev:
	npm install

unit-test:
	npm test -- --coverage --watchAll=false --testResultsProcessor="jest-junit"