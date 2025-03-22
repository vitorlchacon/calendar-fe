# Variables
TF_DIR    = ./terraform
SSH_USER = dev
SERVER_IP = 192.168.1.211

.PHONY: init plan apply destroy build push deploy clean

# Terraform Commands
init:
	@cd $(TF_DIR) && terraform init

plan:
	@cd $(TF_DIR) && terraform plan

apply:
	@cd $(TF_DIR) && terraform apply -auto-approve

destroy:
	@cd $(TF_DIR) && terraform destroy -auto-approve

# Deploy Application to Server
deploy:
	@ssh -i ~/.ssh/dev.key $(SSH_USER)@$(SERVER_IP) "kubectl --namespace=calendar apply -f ~/calendar-fe/k8s/calendar-fe-service.yaml"
	@ssh -i ~/.ssh/dev.key $(SSH_USER)@$(SERVER_IP) "kubectl --namespace=calendar apply -f ~/calendar-be/k8s/calendar-fe-deployment.yaml"
