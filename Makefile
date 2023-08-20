
IMAGES := $(shell docker images -q)
CONTAINERS := $(shell docker ps -q)

rm-images:
	[ -z "$(IMAGES)" ] && echo "No images to delete" || docker image rm -f $(IMAGES)

rm-containers:
	[ -z "$(CONTAINERS)" ] && echo "No containers to delete" || docker stop $(CONTAINERS)
	docker container prune -f

clear-docker: rm-containers rm-images

entrance:
	docker exec -it $(ID) bash


DATE := $(shell date +"%Y_%m_%d__%I_%M_%p")
dump:
	docker exec $(ID) sh -c 'mongodump --archive' > ./backup/$(DATE).dump
restore:
	docker exec -i $(ID) sh -c 'mongorestore --archive' < ./backup/$(DUMP_NAME).dump
