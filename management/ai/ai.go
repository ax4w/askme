package ai

type Response struct {
	Content string `json:"content"`
	Author  string `json:"author"`
	Model   string `json:"model"`
}

func QueryModel(model string, message string) Response {
	var response string
	if client, ok := modelToClient[model]; ok {
		response = queryOpenAiModel(client, model, message)
	} else {
		response = queryOllamaModel(model, message)
	}
	return Response{
		Content: response,
		Author:  "AI",
		Model:   model,
	}
}

func AllAvailableModels() map[string]string {
	var result = make(map[string]string)
	for _, model := range allAvailableOllamaModels().Models {
		result[model.Name] = model.Name + " (Ollama)"
	}
	for k, v := range supportedModels {
		result[k] = v
	}
	return result
}
