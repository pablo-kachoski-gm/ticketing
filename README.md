# Ticketing Project

## Requirements:

- Docker
- Kubernetes
- Scaffold

# Install docker

https://docs.docker.com/get-docker/

# Activate kubernetes

From docker desktop -> settings -> kubernetes -> enable kubernetes

# Install nginx kubernetes (load balancer + ingress controller)

Info: https://kubernetes.github.io/ingress-nginx/deploy/

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml

# Install Scaffold

https://skaffold.dev/docs/install/

# From project base folder

skaffold dev
