variable "ssh_private_key_path" {
  description = "Path to SSH private key"
  default     = "~/.ssh/dev.key"
}

variable "server_ip" {
  description = "Remote server IP"
  default     = "192.168.1.211"
}

variable "ssh_user" {
  description = "SSH user for the remote server"
  default     = "dev"
}