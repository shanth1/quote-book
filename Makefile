
IMAGES := $(shell docker images -q)
CONTAINERS := $(shell docker ps -q)

make up:
	docker compose up -d

make reup:
	docker compose up -d  --force-recreate

make prune:
	docker image prune -f
	docker container prune -f
	docker volume prune -f
	docker network prune -f
	docker system prune -f

rmi:
	[ -z "$(IMAGES)" ] && echo "No images to delete" || docker image rm -f $(IMAGES)

rmc:
	[ -z "$(CONTAINERS)" ] && echo "No containers to delete" || docker stop $(CONTAINERS)
	docker container prune -f

clear: rmc rmi

in:
	docker exec -it $(ID) bash


DATE := $(shell date +"%Y_%m_%d__%I_%M_%p")
dump:
	docker exec $(ID) sh -c 'mongodump --authenticationDatabase quotes -u $(USER) -p $(PASSWORD) --db quotes --archive' > ./backup/$(DATE).dump
restore:
	docker exec -i $(ID) sh -c 'mongorestore --authenticationDatabase admin -u $(USER) -p $(PASSWORD) --db quotes --archive' < ./backup/$(DUMP_NAME).dump
