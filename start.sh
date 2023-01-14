echo '  -- build  -- \n'
docker-compose up -d --build

echo '  -- migrations  -- \n'
docker exec -it api-csv-charge yarn generate
docker exec -it api-csv-charge yarn migrate

echo '  -- restart  -- \n'
docker restart api-csv-charge