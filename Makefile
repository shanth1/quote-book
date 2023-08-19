
IMAGES := $(shell docker images -q)

rm-images:
	[ -z "$(IMAGES)" ] && echo "No images to delete" || docker image rm -f $(IMAGES)

rm-containers:
	docker compose down
	docker container prune -f

clear-docker: rm-containers rm-images
	


