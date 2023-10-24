if [ "$1" == "build" ]; then
  docker compose -f "docker-compose.prod.yml" up -d --build
elif [ "$1" == "dev" ]; then
  docker compose up -d --build
else
  echo "Utilisation : $0 [build|dev]"
fi