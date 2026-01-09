VITE_ALBY_ID := 5CetJoPgnR
VITE_REDIRECT_URL := https://boostbeach.xyz
VITE_SERVER_URL := https://boostbeach.xyz

all:
	docker build \
	--pull --no-cache --load \
	--build-arg VITE_REDIRECT_URL=$(VITE_REDIRECT_URL) \
	--build-arg VITE_SERVER_URL=$(VITE_SERVER_URL) \
	--build-arg VITE_ALBY_ID=$(VITE_ALBY_ID) \
	-t ericpp/thesplitbox .

upload:
	docker push ericpp/thesplitbox
