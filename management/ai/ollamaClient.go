package ai

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"os"
)

var ollamaConnString = os.Getenv("OLLAMA_CONNECTION_STRING")

func queryOllamaModel(model string, message string) string {
	requestBody := ollamaChatRequest{
		Model: model,
		Messages: []ollamaChatMessage{
			{
				Role:    "user",
				Content: message,
			},
		},
	}
	jsonBody, err := json.Marshal(requestBody)
	if err != nil {
		return ""
	}
	resp, err := http.Post(ollamaConnString+"/api/chat", "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		return ""
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return ""
	}

	var response ollamaGenerateResponse
	err = json.Unmarshal(body, &response)
	if err != nil {
		return ""
	}
	return response.Message.Content
}

func allAvailableOllamaModels() ollamaList {
	resp, err := http.Get(ollamaConnString + "/api/tags")
	if err != nil {
		return ollamaList{}
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return ollamaList{}
	}

	var models ollamaList
	err = json.Unmarshal(body, &models)
	if err != nil {
		return ollamaList{}
	}
	return models
}
