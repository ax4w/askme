# askme

## Deployment
### Info
Used Ports: 
- Mangement uses port 6969
- Frontend uses port 3000
- Ollama uses its default port

### Easy way
Just use the compose.yaml and add all needed env parameters

### Custom 
If you dont want to run ollama on the same server as askme, you need to remove ollama von compose.yaml and set OLLAMA_CONNECTION_STRING by hand to your ollama install

You could also distribute the management to another system by setting MANAGEMENT_CONNECTION_STRING by hand to the management
