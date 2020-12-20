# Ticketing Project

## Requirements:

- Docker
- Kubernetes
- Scaffold

## Install docker

https://docs.docker.com/get-docker/

## Activate kubernetes

click on docker desktop tray bar icon -> settings -> kubernetes -> enable kubernetes

## Install nginx kubernetes (load balancer + ingress controller)

Info:

- https://kubernetes.github.io/ingress-nginx/deploy/
- https://kubernetes.github.io/ingress-nginx/user-guide/basic-usage/

Run in console: kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml

(Note: you can remove this by running kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission)

## Install Scaffold

https://skaffold.dev/docs/install/

## Configure HOSTS file

Edit hosts file and add the following line
127.0.0.1 ticketing.dev

## Kubernetes additional config

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=ticketing-jwt-key

## Build docker images

auth directory run:

- docker build -t paka/auth .

tickets directory run:

- docker build -t paka/tickets .

## From project base folder

Run in console: skaffold dev
