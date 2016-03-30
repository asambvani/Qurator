deploy:
	@echo "Pushing to production"
	@git push production master

update:
	@echo "Makefile: Doing UPDATE stuff"
	@rm -r -f node_modules
	@npm install
