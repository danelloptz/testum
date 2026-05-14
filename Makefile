NODE_MODULES=node_modules
PKG_LOCK=package-lock.json

.PHONY: install dev build preview clean reinstall help

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

clean:
	rm -rf dist
	rm -rf $(NODE_MODULES)

reinstall: clean install

help:
	@echo "Available commands:"
	@echo "  make install    - install dependencies"
	@echo "  make dev        - start dev server"
	@echo "  make build      - build production"
	@echo "  make preview    - preview build"
	@echo "  make clean      - remove node_modules and dist"
	@echo "  make reinstall  - clean + install"