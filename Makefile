# Usage: make [dev|prod|stop|clean]

.PHONY: dev prod stop clean

dev:
	@echo "🛠️  Building and starting DEV environment..."
	docker compose down
	docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up -d --build --remove-orphans
	docker compose logs -f --tail=100

prod:
	@echo "🚀 Building and starting PROD environment..."
	docker compose down
	docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env up -d --build --remove-orphans
	docker compose logs -f --tail=100

stop:
	@echo "🛑 Stopping all containers..."
	docker compose down --remove-orphans

clean:
	@echo "🧹 Deep cleaning environment..."
	docker compose down --volumes --remove-orphans --rmi all
	docker system prune -a -f --volumes
