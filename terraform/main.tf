provider "null" {}

# Provision the remote server using SSH
resource "null_resource" "provision_server" {
  connection {
    type        = "ssh"
    user        = var.ssh_user
    host        = var.server_ip
    private_key = file(var.ssh_private_key_path)
  }

  provisioner "remote-exec" {
    inline = [
      "cd calendar-fe",
      "git pull origin master",
      "docker build --quiet --no-cache -t calendar-fe:1.0.0 .",
      "docker save calendar-fe:1.0.0 | k3s ctr images import -"
    ]
  }
}
